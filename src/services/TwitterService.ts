import Twitter from "twitter";
import { ReportInterface } from "../interfaces/Report";
require("dotenv").config();

class TwitterService {
  public client: any;

  public constructor() {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
  }

  protected async getDescription(report) {}

  public async tweet(report: ReportInterface) {
    this.client
      .post("statuses/update", {
        status: this.getDescription(report),
        lat: report.location[1],
        long: report.location[0],
        display_coordinates: true
      })
      .catch(function(err: any) {
        throw err;
      });
  }
}

export default TwitterService;
