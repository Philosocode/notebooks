const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/../env/db.env" });
dotenv.config({ path: __dirname + "/../env/backend.env" });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      charset: "utf8",
    },
    migrations: { directory: "./db/migrations" },
    seeds: { directory: "./db/seeds" },
  },
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_TEST_DB,
      charset: "utf8",
    },
    migrations: { directory: "./db/migrations" },
  },
  production: {
    client: "pg",
    connection: {
      host: "localhost",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      charset: "utf8",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
  },
  onUpdateTrigger: (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,
};
