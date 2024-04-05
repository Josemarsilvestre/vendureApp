import { Linter } from 'eslint';

const config: Linter.Config = {
  root: true,
  extends: ['universe/native', 'plugin:prettier/recommended'],
  env: {
    node: true,
  },
};

export default config;
