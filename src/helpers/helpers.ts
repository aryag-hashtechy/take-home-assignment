import { Options, Questions } from "../models";
import { Op } from "sequelize";

type FilterClauseType = {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
};

export const insertQuestionsData = async (questions: any[]) => {
  try {
    for (const question of questions) {
      await Questions.create({
        id: question.id,
        name: question.name,
        type: question.type,
        value: question.value,
      });

      if (question?.type === "MultipleChoice") {
        for (const opt of question?.options) {
          await Options.create({
            questionId: question.id,
            label: opt?.label,
            value: opt?.value,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error inserting questions:", error);
  }
};

export const getOperator = (
  condition: FilterClauseType["condition"]
): symbol => {
  switch (condition) {
    case "equals":
      return Op.eq;
    case "does_not_equal":
      return Op.ne;
    case "greater_than":
      return Op.gt;
    case "less_than":
      return Op.lt;
    default:
      throw new Error(`Invalid condition: ${condition}`);
  }
};

export const formatResponse = (
  count: number,
  limit: number,
  data: any,
  page: number
) => {
  let totalPages = Math.ceil(count / limit)

  if (
    totalPages === null ||
    totalPages === 0 ||
    totalPages < 0 ||
    totalPages === undefined
  ) {
    totalPages = 1
  }

  return {
    totalPages,
    itemsPerPage: limit,
    currentPage: Number(page),
    data: data ? data : []
  }
}