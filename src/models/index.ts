import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import dbconfig from "../config/dbconfig";
import { Questions } from "./Questions";
import { Options } from "./Options";

dotenv.config();

export const sequelize = new Sequelize({
  database: dbconfig.database,
  username: dbconfig.username,
  password: dbconfig.password,
  host: dbconfig.host,
  dialect: "mysql",
});

sequelize.addModels([Questions, Options]);

export { Questions, Options};

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

// Establish the connection
connectDb();
