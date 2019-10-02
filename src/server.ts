import express from "express";
import cors from "cors";
import signale from "signale";
import morgan from "morgan";
require("dotenv").config();

import routes from "./routes";
import DatabaseService from "./services/DatabaseService";

const PORT = process.env.port || 3333;

class App {
  public express: express.Application;

  private _databaseService: DatabaseService;

  public constructor() {
    this.express = express();
    this._databaseService = new DatabaseService();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this._databaseService.connect();
  }

  private routes(): void {
    this.express.use(routes);
  }
}

new App().express.listen(3333, () => {
  signale.success(`Server is running on ${PORT}`);
});
