import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const astroSliceLibTemplate: TemplateDefinition = {
  commandId: "astroSliceLib",
  title: "Astro Slice with Lib",
  prompt: {
    title: "Имя компонента",
    prompt: "Введите имя компонента",
    defaultValue: "my-component",
  },
  build({ targetDir, folderName, pascalName, camelName }) {
    const rootPath = vscode.Uri.joinPath(targetDir, folderName);
    const uiFilePath = vscode.Uri.joinPath(
      rootPath,
      "ui",
      `${folderName}.astro`,
    );
    const indexPath = vscode.Uri.joinPath(rootPath, "index.ts");

    const indexContent = `export { default as ${pascalName} } from "./ui/${folderName}.astro";`;

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

    const libFilePath = vscode.Uri.joinPath(rootPath, "lib", `index.ts`);

    const libContent = `export function ${camelName}() {

};
`;

    return {
      files: [
        { path: indexPath, content: indexContent },
        { path: uiFilePath, content: componentContent },
        { path: libFilePath, content: libContent },
      ],
      openFile: uiFilePath,
    };
  },
};
