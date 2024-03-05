"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const basic_route_1 = __importDefault(require("./routes/basic-route"));
const bodyParser = require("body-parser");
const formSeeder_1 = require("./seeders/formSeeder");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
models_1.sequelize
    .sync({ force: true })
    .then(() => {
    console.log("Database models synchronized successfully.");
})
    .catch((err) => {
    console.error("Unable to synchronize database:", err);
});
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", basic_route_1.default);
(0, formSeeder_1.getFormData)();
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
