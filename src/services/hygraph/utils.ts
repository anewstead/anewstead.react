import axios from "axios";
import { print } from "graphql/language/printer";
import compress from "graphql-query-compress";
import gql from "graphql-tag";

import { HYG_GQL } from "@/const";

import type { AxiosError } from "axios";
import type { ASTNode, DocumentNode } from "graphql/language/ast";

/**
 * Graphql files will need to be loadable as module:\
 * Vite: https://github.com/noiach/vite-plugin-graphql-loader
 *
 * @param query Gql from file or string
 * @returns String
 */
export const gqlDocToString = (query: DocumentNode | string) => {
  const AST: ASTNode = gql`
    ${query}
  `;
  return compress(print(AST));
};

/**
 * Custom GQLErrorResponce.\
 * Based on actual error response from hygraph cms
 */
type GQLErrorResponce = {
  errors: { message: string }[];
  data: null;
  extensions: { requestId: string };
};

/**
 * Custom fetcher
 *
 * @param query Gql string or operator loaded from .gql file
 * @param variables To pass to query
 * @param options
 * @returns
 */
export const gqlRequest = async <TData, TVariables>(
  query: DocumentNode | string,
  variables?: TVariables,
  options = {}
) => {
  const res = await axios<{ data: TData }>({
    url: HYG_GQL,
    method: "post",
    data: {
      query: gqlDocToString(query),
      variables,
      ...options,
    },
  }).catch((e: AxiosError<GQLErrorResponce>) => {
    let msg = "Loading error";
    /* istanbul ignore next -- @preserve */
    if (e.response?.data.errors?.length) {
      msg = `GQL: ${e.response?.data.errors[0].message}`;
    } else if (e.message) {
      msg = `Fetch: ${e.message}`;
    }
    throw new Error(msg);
  });
  return res.data.data;
};
