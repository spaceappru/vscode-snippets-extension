import * as vscode from "vscode";
import type { PromptNameOptions } from "../utils";

export interface TemplateFile {
  path: vscode.Uri;
  content: string;
}

export interface TemplateContext {
  targetDir: vscode.Uri;
  folderName: string;
  pascalName: string;
  camelName: string;
}

/**
 * Описание шаблона для команды "Создать из шаблона".
 * Добавь новый объект в массив templates и зарегистрируй команду — новая команда готова.
 */
export interface TemplateDefinition {
  /** Уникальный id команды (будет spaceapp.<commandId>) */
  commandId: string;
  /** Название в меню */
  title: string;
  /** Текст для диалога ввода имени */
  prompt: PromptNameOptions;
  /**
   * Создаёт список файлов (и опционально пустых папок) для данного имени.
   * Папки из путей файлов создаются автоматически; dirs — для пустых папок (например lib/).
   */
  build(context: TemplateContext): {
    files: TemplateFile[];
    /** Дополнительные пустые папки (опционально) */
    dirs?: vscode.Uri[];
    /** Какой файл открыть после создания (опционально) */
    openFile?: vscode.Uri;
  };
}
