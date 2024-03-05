"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
exports.routes = express_1.default.Router();
const basic_controller_1 = require("../controllers/basic-controller");
// route for filter data
exports.routes.get("/:formId/filteredResponses", basic_controller_1.filteredResponses);
exports.default = exports.routes;
