"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.Options = exports.Questions = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const Questions_1 = require("./Questions");
Object.defineProperty(exports, "Questions", { enumerable: true, get: function () { return Questions_1.Questions; } });
const Options_1 = require("./Options");
Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return Options_1.Options; } });
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: dbconfig_1.default.database,
    username: dbconfig_1.default.username,
    password: dbconfig_1.default.password,
    host: dbconfig_1.default.host,
    dialect: "mysql",
});
exports.sequelize.addModels([Questions_1.Questions, Options_1.Options]);
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    }
    catch (err) {
        console.error("Unable to connect to the database:", err);
    }
});
exports.connectDb = connectDb;
// Establish the connection
(0, exports.connectDb)();
