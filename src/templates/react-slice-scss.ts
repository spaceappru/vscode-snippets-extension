import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const reactSliceScssTemplate: TemplateDefinition = {
  commandId: "reactSliceScss",
  title: "React Slice with SCSS",
  prompt: {
    title: "Имя компонента",
    prompt: "Введите имя компонента",
    defaultValue: "my-component",
  },
  build({ targetDir, folderName, pascalName }) {
    const rootPath = vscode.Uri.joinPath(targetDir, folderName);
    const componentFilePath = vscode.Uri.joinPath(
      targetDir,
      folderName,
      "ui",
      `${folderName}.tsx`,
    );

    const indexPath = vscode.Uri.joinPath(rootPath, "index.ts");
    const indexContent = `export { ${pascalName}, type ${pascalName}Props } from "./ui/${folderName}";`;

    const componentContent = `import type { FC } from "react";
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
      "ui",
      `${folderName}.module.scss`,
    );

    const scssContent = "";

    return {
      files: [
        { path: indexPath, content: indexContent },
        { path: componentFilePath, content: componentContent },
        { path: scssFilePath, content: scssContent },
      ],
      openFile: componentFilePath,
    };
  },
};
