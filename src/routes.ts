import { Router } from "express";
import ReportController from "./controllers/ReportController";
import TokenValidator from "./utils/tokenValidator";

const routes = Router();

routes.get("/denuncias", TokenValidator.validateToken, ReportController.index);
routes.post(
  "/denuncias",
  TokenValidator.validateToken,
  async (req, res, next) => {
    const reportDTO = req.body;
    const report = ReportController.store(reportDTO);

    return res.json({ report });
  }
);

export default routes;
