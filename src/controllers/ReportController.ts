import { Request, Response } from "express";
import { Report } from "../schemas/Report";
import { ReportInterface } from "../interfaces/Report";
import TwitterService from "../services/TwitterService";

class UserController {
  private twitterService: TwitterService;

  public constructor() {
    this.twitterService = new TwitterService();
  }
  public async index(res: Response): Promise<Response> {
    const reports = await Report.find();
    return res.json(reports);
  }

  public async store(report: ReportInterface) {
    try {
      const reportRecord = await Report.create(report);
      this.twitterService.tweet(reportRecord);
      return { report: reportRecord };
    } catch {}
  }
}

export default new UserController();
