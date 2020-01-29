import { Request, Response } from "express"
import { Report } from "../schemas/Report"
import TwitterService from "../services/TwitterService"

class ReportController {
  private twitterService: TwitterService;

  public constructor () {
    this.twitterService = new TwitterService()
  }
  public async index (req: Request, res: Response): Promise<Response> {
    const reports = await Report.find()
    return res.status(200).json(reports)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const reportDTO = req.body
      const reportRecord = await Report.create(reportDTO)
      await this.twitterService.tweet(reportRecord)
      return res.status(201).json(reportRecord)
    } catch { }
  }
}

export default new ReportController()
