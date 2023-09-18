import axios from "axios";
import { print } from "graphql/language/printer";
import compress from "graphql-query-compress";
import gql from "graphql-tag";

import { HYG_GQL } from "../../const";

import type { ASTNode, DocumentNode } from "graphql/language/ast";

/**
 * requires graphql files to be loadable as module:
 * vite: https://github.com/noiach/vite-plugin-graphql-loader
 * ts: graphql.d.ts > declare module "*.gql";
 * @param query from a .gql file
 * @returns string
 */
const gqlToString = (query: DocumentNode) => {
  const AST: ASTNode = gql`
    ${query}
  `;
  return compress(print(AST));
};

/**
 * custom fetcher
 * @param query from a .gql file
 * @param variables to pass to query
 * @param options
 * @returns
 */
export const gqlRequest = async <TData, TVariables>(
  query: DocumentNode,
  variables?: TVariables,
  options = {}
) => {
  return axios<TData>({
    url: HYG_GQL,
    method: "post",
    data: {
      query: gqlToString(query),
      variables,
      ...options,
    },
  }).then((res) => {
    return res.data;
  });
};
