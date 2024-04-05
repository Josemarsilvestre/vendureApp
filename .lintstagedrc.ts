import { Linter } from 'eslint';

const lintStagedConfig: Linter.Config = {
  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames: string[]) => [
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames: string[]) => `prettier --write ${filenames.join(' ')}`,
};

export default lintStagedConfig;
