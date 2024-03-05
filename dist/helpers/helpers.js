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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = exports.getOperator = exports.insertQuestionsData = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const insertQuestionsData = (questions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const question of questions) {
            const questionExists = yield models_1.Questions.findOne({
                where: {
                    id: question.id
                }
            });
            if (!questionExists) {
                yield models_1.Questions.create({
                    id: question.id,
                    name: question.name,
                    type: question.type,
                    value: question.value,
                });
                if ((question === null || question === void 0 ? void 0 : question.type) === "MultipleChoice") {
                    for (const opt of question === null || question === void 0 ? void 0 : question.options) {
                        yield models_1.Options.create({
                            questionId: question.id,
                            label: opt === null || opt === void 0 ? void 0 : opt.label,
                            value: opt === null || opt === void 0 ? void 0 : opt.value,
                        });
                    }
                }
            }
        }
    }
    catch (error) {
        console.error("Error inserting questions:", error);
    }
});
exports.insertQuestionsData = insertQuestionsData;
const getOperator = (condition) => {
    switch (condition) {
        case "equals":
            return sequelize_1.Op.eq;
        case "does_not_equal":
            return sequelize_1.Op.ne;
        case "greater_than":
            return sequelize_1.Op.gt;
        case "less_than":
            return sequelize_1.Op.lt;
        default:
            throw new Error(`Invalid condition: ${condition}`);
    }
};
exports.getOperator = getOperator;
const formatResponse = (count, limit, data, page) => {
    let totalPages = Math.ceil(count / limit);
    if (totalPages === null ||
        totalPages === 0 ||
        totalPages < 0 ||
        totalPages === undefined) {
        totalPages = 1;
    }
    return {
        totalPages,
        itemsPerPage: limit,
        currentPage: Number(page),
        data: data ? data : []
    };
};
exports.formatResponse = formatResponse;
