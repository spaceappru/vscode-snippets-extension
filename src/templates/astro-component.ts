import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const astroComponentTemplate: TemplateDefinition = {
  commandId: "astroComponent",
  title: "Astro Component",
  prompt: {
    title: "Имя компонента",
    prompt: "Введите имя компонента",
    defaultValue: "my-component",
  },
  build({ targetDir, folderName }) {
    const filePath = vscode.Uri.joinPath(targetDir, `${folderName}.astro`);

    const content = `---
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
      files: [{ path: filePath, content }],
      openFile: filePath,
    };
  },
};
