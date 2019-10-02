import Twitter from "twitter";

class TwitterService {
  public client;

  public constructor() {
    this.client = new Twitter({
      consumer_key: "",
      consumer_secret: "",
      access_token_key: "",
      access_token_secret: ""
    });
  }

  protected async getDescription(report) {}

  protected async tweet(report) {
    this.client
      .post("statuses/update", {
        status: this.getDescription(report),
        lat: report.location[1],
        long: report.location[0],
        display_coordinates: true
      })
      .catch(function(err) {
        throw err;
      });
  }
}
