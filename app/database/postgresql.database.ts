import { Pool } from "pg";
import config from "../config/db.conf";

export const pool = new Pool(config);

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Error connecting to PostgreSQL", error);
    process.exit(1);
  }
};
