import dotenv from "dotenv";
dotenv.config();

const dbconfig = {
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
};

export default dbconfig;
