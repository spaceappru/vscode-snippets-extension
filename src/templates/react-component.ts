import * as vscode from "vscode";
import type { TemplateDefinition } from "./types";

export const reactComponentTemplate: TemplateDefinition = {
  commandId: "reactComponent",
  title: "React Component",
  prompt: {
    title: "Имя компонента",
    prompt: "Введите имя компонента",
    defaultValue: "my-component",
  },
  build({ targetDir, folderName, pascalName }) {
    const filePath = vscode.Uri.joinPath(targetDir, `${folderName}.tsx`);

    const componentContent = `import type { FC } from "react";

export interface ${pascalName}Props {
}

export const ${pascalName}: FC<${pascalName}Props> = () => {
  return <div>${pascalName}</div>;
};
`;

    return {
      files: [{ path: filePath, content: componentContent }],
      openFile: filePath,
    };
  },
};
