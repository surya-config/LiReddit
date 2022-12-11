import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import redis from "redis";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";

const main = async () => {
  // initialize the MikroORM
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  let RedisStore = connectRedis(session);
  let redisClient = redis.createClient();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  // Session & Redis Initialization
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }), // disableTouch will disable TTL
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // Cannot access the cookie on the frontend - security reason
        secure: __prod__, // cookie only works in https
        sameSite: "lax", // csrf
      },
      saveUninitialized: false,
      secret: process.env.NODE_SESSION_SECRET_KEY ?? "",
      resave: false,
    })
  );

  // Apollo Server initialization
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }), // Resolvers can access orm and session from here
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on local host 4000");
  });
};

main().catch((err) => console.error(err));
