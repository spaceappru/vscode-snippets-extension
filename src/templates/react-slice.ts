import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const reactSliceTemplate: TemplateDefinition = {
  commandId: "reactSlice",
  title: "React Slice",
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

export interface ${pascalName}Props {
}

export const ${pascalName}: FC<${pascalName}Props> = () => {
  return <div>${pascalName}</div>;
};
`;

    return {
      files: [
        { path: indexPath, content: indexContent },
        { path: componentFilePath, content: componentContent },
      ],
      openFile: componentFilePath,
    };
  },
};
