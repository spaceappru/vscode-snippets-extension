import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const astroPageTemplate: TemplateDefinition = {
  commandId: "astroPage",
  title: "Astro Page",
  prompt: {
    title: "Имя страницы",
    prompt: "Введите имя страницы",
    defaultValue: "my-page",
  },
  build({ targetDir, folderName }) {
    const filePath = vscode.Uri.joinPath(targetDir, `${folderName}.astro`);

    const content = `---
import Layout from "@/app/layout.astro";
---

<Layout title="${folderName}" script="${folderName}">
    ${folderName}
</Layout>

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
