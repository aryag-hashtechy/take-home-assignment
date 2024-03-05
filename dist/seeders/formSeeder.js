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
exports.getFormData = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("../helpers/helpers");
dotenv_1.default.config();
const getFormData = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
        },
    };
    try {
        const response = yield axios_1.default.get(`https://api.fillout.com/v1/api/forms/${process.env.FORM_ID}/submissions`, config);
        if ((response === null || response === void 0 ? void 0 : response.status) == 200 && ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.responses)) {
            // store one data for Implementation filter functionility
            let list = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.responses[0];
            (0, helpers_1.insertQuestionsData)(list === null || list === void 0 ? void 0 : list.questions);
        }
    }
    catch (error) {
        throw new Error("Failed to fetch data from Fillout API");
    }
});
exports.getFormData = getFormData;
