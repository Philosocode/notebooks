const { randomBytes } = require("crypto");
const knex = require("knex");
const format = require("pg-format");
const dotenv = require("dotenv");
const pg = require("pg");

dotenv.config({ path: __dirname + "/../../env/db.env" });
dotenv.config({ path: __dirname + "/../../env/backend.env" });

const pgOptions = {
  host: "localhost",
  port: 5432,
  database: process.env.POSTGRES_TEST_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const knexOptions = (user, password) => {
  return {
    client: "pg",
    connection: {
      host: "localhost",
      user: user,
      password: password,
      database: process.env.POSTGRES_TEST_DB,
      charset: "utf8",
    },
    migrations: { directory: "./db/migrations" },
    seeds: { directory: "./db/seeds" },
  };
};

class TestingContext {
  static async build() {
    // Connect to PG
    const pool = new pg.Pool(pgOptions);
    await pool.query("SELECT 1 + 1;");

    // Randomly generating a role name to connect to PG as
    const roleName = "a" + randomBytes(4).toString("hex");

    // Create uuid extension if needed
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create a new role
    // can't use parameterized query bc not in WHERE
    // can't use for identifiers - name of schema, table, role, etc
    // need to use pg-format
    // %I: identifier, %L: literal value
    await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
    );

    // Create a schema with the same name
    await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
    );

    // Disconnect entirely from PG
    await pool.end();

    // Connect to PG using Knex as the newly created role
    const knexPool = require("knex")(knexOptions(roleName, roleName));

    // Run migrations in the new schema
    await knexPool.migrate.latest({ schemaName: roleName });

    return new TestingContext(knexPool, roleName);
  }

  constructor(db, roleName) {
    this.roleName = roleName;
    this.db = db;
  }

  async close() {
    // Disconnect from PG
    await this.db.destroy();

    // Reconnect as our root user
    const pool = new pg.Pool(pgOptions);
    await pool.query("SELECT 1 + 1;");

    // Delete the role and schema we created
    await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));
    await pool.query(format("DROP ROLE %I;", this.roleName));

    // Disconnect
    await pool.end();
  }
}

module.exports = TestingContext;
