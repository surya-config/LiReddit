import { Cache, QueryInput } from "@urql/exchange-graphcache";

export const update = <Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) => cache.updateQuery(qi, (data) => fn(result, data as any) as any);
