import axios from "axios";
import { print } from "graphql/language/printer";
import compress from "graphql-query-compress";
import gql from "graphql-tag";

import { HYG_GQL } from "../../const";

import type { ASTNode, DocumentNode } from "graphql/language/ast";

/**
 * Graphql files will need to be loadable as module:\
 * Vite: https://github.com/noiach/vite-plugin-graphql-loader
 *
 * @param query From a .gql file
 * @returns String
 */
const gqlToString = (query: DocumentNode) => {
  const AST: ASTNode = gql`
    ${query}
  `;
  return compress(print(AST));
};

/**
 * Custom fetcher
 *
 * @param query From a .gql file
 * @param variables To pass to query
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
