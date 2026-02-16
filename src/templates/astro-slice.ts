import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const astroSliceTemplate: TemplateDefinition = {
  commandId: "astroSlice",
  title: "Astro Slice",
  prompt: {
    title: "Имя компонента",
    prompt: "Введите имя компонента",
    defaultValue: "my-component",
  },
  build({ targetDir, folderName, pascalName }) {
    const rootPath = vscode.Uri.joinPath(targetDir, folderName);
    const uiPath = vscode.Uri.joinPath(rootPath, "ui");
    const uiFilePath = vscode.Uri.joinPath(uiPath, `${folderName}.astro`);
    const indexPath = vscode.Uri.joinPath(rootPath, "index.ts");

    const indexContent = `export { default as ${pascalName} } from "./ui/${folderName}.astro";
`;

    const componentContent = `---
interface Props {
}

const {} = Astro.props;
---

<div class="${folderName}">
  ${folderName}
</div>

<style is:global lang="scss">
  .${folderName} {

  }
</style>
`;

    return {
      files: [
        { path: indexPath, content: indexContent },
        { path: uiFilePath, content: componentContent },
      ],
      openFile: uiFilePath,
    };
  },
};
