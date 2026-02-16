import * as vscode from "vscode";
import { registerTemplateCommand } from "./templateRunner";
import { templates } from "./templates";

export function activate(context: vscode.ExtensionContext) {
  for (const template of templates) {
    registerTemplateCommand(context, template);
  }
}
