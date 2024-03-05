import { Request, Response } from "express";
import { Op } from "sequelize";
import { formatResponse, getOperator } from "../helpers/helpers";
import { Questions } from "../models";

// @desc Filter Data
// @Route api/:formId/filteredResponses
// @Access Public
const filteredResponses = async (req: Request, res: Response) => {
  const limit = 5;
  const filtersParam = req.query.filters as string;

  try {
    
    if (!filtersParam) {
      const data = await Questions.findAll();
      res.status(200).send(data);
    }

    const decodedFiltersString = decodeURIComponent(filtersParam);
    const filters = JSON.parse(decodedFiltersString);

    const whereClause = {
      [Op.or]: filters.map((filter: any) => {
        // This is a helper util function which returns returns the matching Sequelize operator corresponding to user-defined operators
        const operator = getOperator(filter.condition);

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

    const data = await Questions.findAndCountAll({
      where: whereClause,
      offset: filters?.page ? (filters?.page - 1) * limit : null,
      limit: limit ? limit : null,
    });

    const totalDataCount = await Questions.count();

    if (!data) {
      res.status(404).send({ message: "No matching entries found." });
    }

    const formattedResponse = formatResponse(
      totalDataCount,
      limit,
      data,
      filters.page || 1
    );
    res.status(200).send(formattedResponse);
  } catch (error) {
    // Unhandled Exceptions
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

export { filteredResponses };
