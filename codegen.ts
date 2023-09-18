import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://api-eu-west-2.hygraph.com/v2/clj5rnzhr0grm01ui4kzcbmu1/master",
  documents: "./src/services/hygraph/*.*",
  generates: {
    "./src/services/hygraph/generated/": {
      preset: "client",
      plugins: [],
    },
    "./src/services/hygraph/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
