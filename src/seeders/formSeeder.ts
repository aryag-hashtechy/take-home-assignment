import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
import { insertQuestionsData } from "../helpers/helpers";
dotenv.config();

export const getFormData = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.fillout.com/v1/api/forms/${process.env.FORM_ID}/submissions`,
      config
    );

    if (response?.status == 200 && response?.data?.responses) {
      // store one data for Implementation filter functionility
      let list = response?.data?.responses[0];
      insertQuestionsData(list?.questions);
    }
  } catch (error) {
    throw new Error("Failed to fetch data from Fillout API");
  }
};
