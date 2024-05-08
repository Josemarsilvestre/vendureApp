
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/shop-api",
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        scalars: {
            // This tells codegen that the `Money` scalar is a number
            Money: 'number',
        },
        namingConvention: {
            // This ensures generated enums do not conflict with the built-in types.
            enumValues: 'keep',
        },
      }
    }
  }
};

export default config;
