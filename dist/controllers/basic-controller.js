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
exports.filteredResponses = void 0;
const sequelize_1 = require("sequelize");
const helpers_1 = require("../helpers/helpers");
const models_1 = require("../models");
// @desc Filter Data
// @Route api/:formId/filteredResponses
// @Access Public
const filteredResponses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 5;
    const filtersParam = req.query.filters;
    const decodedFiltersString = decodeURIComponent(filtersParam);
    const filters = JSON.parse(decodedFiltersString);
    try {
        const whereClause = {
            [sequelize_1.Op.or]: filters.map((filter) => {
                // This is a helper util function which returns returns the matching Sequelize operator corresponding to user-defined operators
                const operator = (0, helpers_1.getOperator)(filter.condition);
                // For this assignment, we filter based on id and value
                const id = filter.id;
                const value = filter.value;
                return {
                    id,
                    value: {
                        [operator]: value,
                    },
                };
            }),
        };
        const data = yield models_1.Questions.findAndCountAll({
            where: whereClause,
            offset: (filters === null || filters === void 0 ? void 0 : filters.page) ? ((filters === null || filters === void 0 ? void 0 : filters.page) - 1) * limit : null,
            limit: limit ? limit : null,
        });
        const totalDataCount = yield models_1.Questions.count();
        if (!data) {
            res.status(404).send({ message: "No matching entries found." });
        }
        const formattedResponse = (0, helpers_1.formatResponse)(totalDataCount, limit, data, filters.page || 1);
        res.status(200).send(formattedResponse);
    }
    catch (error) {
        // Unhandled Exceptions
        res.status(500).send({
            message: "Internal Server Error",
            error,
        });
    }
});
exports.filteredResponses = filteredResponses;
