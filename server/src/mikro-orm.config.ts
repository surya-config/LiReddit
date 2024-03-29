import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

const config: Parameters<typeof MikroORM.init>[0] = {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: "liredditdb",
  user: "postgres",
  password: "root",
  type: "postgresql",
  debug: !__prod__,
};

export default config;
