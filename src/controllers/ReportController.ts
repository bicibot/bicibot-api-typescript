import { Request, Response, Router } from "express";
import { Report } from "../schemas/Report";

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reports = await Report.find();

    return res.json(reports);
  }

  public async store(report: any) {
    const reportRecord = await Report.create(report);

    return { report: reportRecord };
  }
}

export default new UserController();
