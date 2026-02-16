import * as vscode from "vscode";

/** Папка, в которой создавать (из контекста или выбора пользователя). */
export async function getTargetDir(
  uri: vscode.Uri | undefined
): Promise<vscode.Uri | null> {
  if (uri) return uri;
  const activeFile = vscode.window.activeTextEditor?.document.uri;
  if (activeFile) return vscode.Uri.joinPath(activeFile, "..");
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder) return null;
  return folder.uri;
}

const NO_FOLDER_MESSAGE =
  "Откройте папку или выберите папку в проводнике (ПКМ → New From Template...)";

export function showNoFolderError(): void {
  vscode.window.showErrorMessage(NO_FOLDER_MESSAGE);
}

/** kebab-case → PascalCase */
export function kebabToPascal(kebab: string): string {
  return kebab
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    .replace(/^([a-z])/, (_, c) => c.toUpperCase());
}

/** PascalCase → camelCase */
export function pascalToCamel(pascal: string): string {
  if (!pascal) return pascal;
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export interface PromptNameOptions {
  title: string;
  prompt: string;
  defaultValue?: string;
  /** Регулярка для формата (например kebab-case). По умолчанию kebab-case. */
  pattern?: RegExp;
  patternHint?: string;
}

const DEFAULT_KEBAB = /^[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*$/;
const DEFAULT_HINT = "Используйте kebab-case (например: my-component)";

/**
 * Запросить имя у пользователя с валидацией.
 * @returns введённое имя (trim) или undefined при отмене.
 */
export async function promptName(
  options: PromptNameOptions
): Promise<string | undefined> {
  const {
    title,
    prompt,
    defaultValue = "my-component",
    pattern = DEFAULT_KEBAB,
    patternHint = DEFAULT_HINT,
  } = options;

  const value = await vscode.window.showInputBox({
    title,
    prompt,
    value: defaultValue,
    valueSelection: [0, defaultValue.length],
    validateInput: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return "Введите имя";
      if (/[<>:"/\\|?*]/.test(value)) return "Недопустимые символы в имени";
      if (!pattern.test(trimmed)) return patternHint;
      return null;
    },
  });

  return value === undefined ? undefined : value.trim();
}

const encoder = new TextEncoder();

export async function writeFile(
  uri: vscode.Uri,
  content: string
): Promise<void> {
  await vscode.workspace.fs.writeFile(uri, encoder.encode(content));
}

export async function createDirs(uris: vscode.Uri[]): Promise<void> {
  for (const uri of uris) {
    await vscode.workspace.fs.createDirectory(uri);
  }
}
