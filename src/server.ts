import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./models";
import basicRoutes from "./routes/basic-route";
import bodyParser = require("body-parser");
import { getFormData } from "./seeders/formSeeder";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database models synchronized successfully.");
  })
  .catch((err: Error) => {
    console.error("Unable to synchronize database:", err);
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", basicRoutes);

getFormData();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
