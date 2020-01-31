import routes from "./routes"
import DatabaseService from "./services/DatabaseService"

import express from "express"
import cors from "cors"
import signale from "signale"
import morgan from "morgan"
import bodyparser from "body-parser"
import MailerService from "./services/MailerService"
require("dotenv").config()

const PORT = process.env.port || 3333

class App {
  public express: express.Application;

  private _databaseService: DatabaseService;

  private _mailerService: MailerService;

  public constructor () {
    this.express = express()
    this._databaseService = new DatabaseService()
    this._mailerService = new MailerService()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(morgan("dev"))
    this.express.use(bodyparser.json())
    this._databaseService.connect()
  }

  private routes (): void {
    this.express.use(routes)
  }
}

new App().express.listen(3333, (): void => {
  signale.success(`Server is running on ${PORT}`)
})
