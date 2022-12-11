import { dedupExchange, fetchExchange } from "@urql/core";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  LogoutMutation,
} from "../generated/graphql";
import { update } from "./update";
import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" as const },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            update<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return { me: result.login.user };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            update<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return { me: result.register.user };
                }
              }
            );
          },
          logout: (_result, args, cache, info) => {
            update<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({
                me: null,
              })
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
