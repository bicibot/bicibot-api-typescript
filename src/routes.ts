import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import ReportController from "./controllers/ReportController";
import TokenValidator from "./utils/tokenValidator";

const routes = Router();

routes.use("/docs", swaggerUi.serve);
routes.get("/docs", swaggerUi.setup());

routes.get("/denuncias", TokenValidator.validateToken, ReportController.index);

routes.post("/denuncias", TokenValidator.validateToken, async (req, res) => {
  const reportDTO = req.body;
  const report = ReportController.store(reportDTO);

  return res.json({ report });
});

export default routes;
