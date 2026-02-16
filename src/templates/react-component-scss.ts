import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const reactComponentScssTemplate: TemplateDefinition = {
  commandId: "reactComponentScss",
  title: "React Component with SCSS",
  prompt: {
    title: "Имя компонента",
    prompt: "Введите имя компонента",
    defaultValue: "my-component",
  },
  build({ targetDir, folderName, pascalName }) {
    const tsxFilePath = vscode.Uri.joinPath(
      targetDir,
      folderName,
      `${folderName}.tsx`,
    );

    const tsxContent = `import type { FC } from "react";
import styles from "./${folderName}.module.scss";

export interface ${pascalName}Props {
}

export const ${pascalName}: FC<${pascalName}Props> = () => {
  return <div>${pascalName}</div>;
};
`;

    const scssFilePath = vscode.Uri.joinPath(
      targetDir,
      folderName,
      `${folderName}.module.scss`,
    );

    const scssContent = "";

    return {
      files: [
        { path: tsxFilePath, content: tsxContent },
        { path: scssFilePath, content: scssContent },
      ],
      openFile: tsxFilePath,
    };
  },
};
