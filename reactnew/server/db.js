import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "todos",
});

const query = (text, params) => pool.query(text, params);

export { query };
