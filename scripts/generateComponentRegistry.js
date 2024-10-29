const fs = require("fs");
const path = require("path");

function escapeSource(source) {
  return source.replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function toCamelCase(str) {
  return str
    .split("-") // Split by dashes
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ) // Capitalize each word except the first
    .join(""); // Join words without spaces
}

function generateRegistry(formType = "react-hook-form") {
  const componentsDir = path.join(
    __dirname,
    "../",
    "src",
    "components",
    "ui",
    formType
  ); // Path to your components
  const outputFile = path.join(
    __dirname,
    "../",
    "src",
    "__registry__",
    `${formType}.ts`
  ); // Output file path

  let componentNames = [];

  let output = ``;

  const componentFiles = fs.readdirSync(componentsDir);

  output += `export const ${toCamelCase(formType)}ComponentRegistry = {\n`;

  componentFiles.forEach((file) => {
    const componentName = file.replace(/\-form-field.tsx$/, "");
    const componentPath = path.join(componentsDir, file);

    componentNames.push(componentName);

    let sourceCode = escapeSource(fs.readFileSync(componentPath, "utf8"));
    sourceCode = sourceCode
      .replaceAll(`"use client";\n`, "")
      .replaceAll("../", "./");

    output += `  "${componentName}": {\n`;
    output += `    fileName: \`${file}\`,\n`;
    output += `    sourceCode: \`${sourceCode}\`\n`;
    output += `  },\n`;
  });

  output += `};\n`;

  fs.writeFileSync(outputFile, output);

  console.log(
    "Component registry with source code generated and made necessary changes."
  );
}

const formTypes = ["react-hook-form", "formik", "tanstack-form"];
formTypes.forEach((formType) => generateRegistry(formType));
