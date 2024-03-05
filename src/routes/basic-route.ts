import express from "express";
export const routes = express.Router();
import { filteredResponses } from "../controllers/basic-controller";

// route for filter data
routes.get("/:formId/filteredResponses", filteredResponses);

export default routes;
