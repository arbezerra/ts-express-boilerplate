import config from "../knexfile";
import knex from "knex";

const pool = knex(config[process.env.NODE_ENV || "development"])
export default pool;
