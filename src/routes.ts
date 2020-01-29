import { Router } from "express"
import swaggerUi from "swagger-ui-express"
import ReportController from "./controllers/ReportController"
import TokenValidator from "./utils/tokenValidator"

const routes = Router()

routes.use("/docs", swaggerUi.serve)
routes.get("/docs", swaggerUi.setup())

routes.get("/denuncias", ReportController.index)

routes.post("/denuncias", TokenValidator.validateToken, ReportController.store)

export default routes
