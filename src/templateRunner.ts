import * as vscode from "vscode";
import {
  getTargetDir,
  showNoFolderError,
  promptName,
  kebabToPascal,
  pascalToCamel,
  writeFile,
  createDirs,
} from "./utils";
import type { TemplateDefinition, TemplateContext } from "./templates/types";

/** Собирает все родительские директории для путей файлов (уникальные). */
function collectDirsFromFiles(files: { path: vscode.Uri }[]): vscode.Uri[] {
  const dirSet = new Set<string>();
  for (const f of files) {
    let dir = f.path;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const parent = vscode.Uri.joinPath(dir, "..");
      if (parent.fsPath === dir.fsPath) break;
      dir = parent;
      dirSet.add(dir.fsPath);
    }
  }
  return [...dirSet].map((p) => vscode.Uri.file(p));
}

/**
 * Запускает шаблон: запрашивает папку и имя, создаёт папки/файлы, при необходимости открывает файл.
 */
export async function runTemplate(
  template: TemplateDefinition,
  uri: vscode.Uri | undefined
): Promise<void> {
  try {
    const targetDir = await getTargetDir(uri);
    if (!targetDir) {
      showNoFolderError();
      return;
    }

    const folderName = await promptName(template.prompt);
    if (folderName === undefined) return;

    const pascalName = kebabToPascal(folderName);
    const camelName = pascalToCamel(pascalName);
    const context: TemplateContext = {
      targetDir,
      folderName,
      pascalName,
      camelName,
    };

    const { files, dirs: extraDirs = [], openFile } = template.build(context);
    const dirs = collectDirsFromFiles(files);
    const allDirs = [...dirs, ...extraDirs];

    await createDirs(allDirs);
    for (const file of files) {
      await writeFile(file.path, file.content);
    }

    if (openFile) {
      const doc = await vscode.workspace.openTextDocument(openFile);
      await vscode.window.showTextDocument(doc);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`Не удалось создать файл: ${message}`);
  }
}

/**
 * Регистрирует команду для шаблона.
 * В package.json нужно добавить команду "spaceapp.<template.commandId>" и пункт в меню.
 */
export function registerTemplateCommand(
  context: vscode.ExtensionContext,
  template: TemplateDefinition
): void {
  const fullCommandId = `spaceapp.${template.commandId}`;
  const disposable = vscode.commands.registerCommand(
    fullCommandId,
    async (uri: vscode.Uri | undefined) => {
      await runTemplate(template, uri);
    }
  );
  context.subscriptions.push(disposable);
}
