import fs from 'fs';
import path from 'path';

import { Plugin } from 'vite';
import { Project } from 'ts-morph';

interface FunctionDocumentation {
  name: string;
  description: string;
  params: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  returns: {
    type: string;
    description: string;
  };
  example?: string;
}

export function jsdocParserPlugin(options?: { sourceDir?: string; outputFile?: string }): Plugin {
  const { sourceDir = './src', outputFile = './function-docs.json' } = options || {};

  return {
    name: 'advanced-jsdoc-parser',
    buildStart() {
      // Create ts-morph project
      const project = new Project({
        compilerOptions: {
          allowJs: true,
          declaration: true,
        },
      });

      // Collect all TypeScript files
      const tsFiles = getAllTypescriptFiles(sourceDir);

      // Parse documentation for all functions
      const allFunctionDocs: Record<string, FunctionDocumentation> = {};

      tsFiles.forEach((filePath) => {
        const sourceFile = project.addSourceFileAtPath(filePath);

        sourceFile.getFunctions().forEach((func) => {
          const jsDocs = func.getJsDocs();

          if (jsDocs.length > 0) {
            const functionDoc: FunctionDocumentation = {
              name: func.getName() || '',
              description: extractDescription(jsDocs[0]),
              params: extractParams(func, jsDocs[0]),
              returns: extractReturns(func, jsDocs[0]),
              example: extractExample(jsDocs[0]),
            };

            allFunctionDocs[functionDoc.name] = functionDoc;
          }
        });
      });

      // Write parsed documentation to file
      fs.writeFileSync(path.resolve(outputFile), JSON.stringify(allFunctionDocs, null, 2));

      console.log('Advanced JSDoc parsing completed');
    },
  };
}

// Helper function to recursively find TypeScript files
function getAllTypescriptFiles(dir: string): string[] {
  const files: string[] = [];

  function traverseDirectory(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        files.push(fullPath);
      }
    }
  }

  traverseDirectory(dir);
  return files;
}

// Extract description from JSDoc
function extractDescription(doc: any): string {
  return doc.getComment() || '';
}

// Extract parameter details
function extractParams(func: any, doc: any): any[] {
  return func.getParameters().map((param: any) => {
    const paramName = param.getName();
    const paramTag = doc
      .getTags()
      .find((tag: any) => tag.getTagName() === 'param' && tag.getText().includes(paramName));

    return {
      name: paramName,
      type: param.getType().getText(),
      description: paramTag ? paramTag.getComment() || '' : '',
    };
  });
}

// Extract return type details
function extractReturns(func: any, doc: any): any {
  const returnType = func.getReturnType().getText();
  const returnTag = doc.getTags().find((tag: any) => tag.getTagName() === 'returns' || tag.getTagName() === 'return');

  return {
    type: returnType,
    description: returnTag ? returnTag.getComment() || '' : '',
  };
}

// Extract example from JSDoc
function extractExample(doc: any): string | undefined {
  const exampleTag = doc.getTags().find((tag: any) => tag.getTagName() === 'example');

  return exampleTag ? exampleTag.getComment() : undefined;
}

export default jsdocParserPlugin;
