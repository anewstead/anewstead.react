import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://api-eu-west-2.hygraph.com/v2/clj5rnzhr0grm01ui4kzcbmu1/master",
  documents: "./src/services/hygraph/*.gql",
  ignoreNoDocuments: true,
  generates: {
    "./src/services/hygraph/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        useTypeImports: true,
        skipTypename: true,
        inlineFragmentTypes: "combine",
      },
    },
    "./src/services/hygraph/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "./src/services/hygraph/generated/mockData.ts": {
      plugins: [
        {
          "typescript-mock-data": {
            typesFile: "./graphql.ts",
            transformUnderscore: false,
            terminateCircularRelationships: true,
          },
        },
      ],
    },
  },
};

export default config;
