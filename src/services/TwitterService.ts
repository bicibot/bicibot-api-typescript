import Twitter from "twitter"
import { ReportInterface } from "../interfaces/Report"
require("dotenv").config()

class TwitterService {
  public client;

  public constructor () {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })
  }

  public async tweet (report: ReportInterface): Promise<void> {
    this.client
      .post("statuses/update", {
        status: this.getDescription(report),
        lat: report.location[1],
        long: report.location[0],
        display_coordinates: true
      })
      .catch((err): void => {
        throw err
      })
  }

  protected async getDescription (report: ReportInterface): Promise<string> {
    let plate = ""
    if (report.plate !== undefined) {
      plate = `(${report.plate})`
    }
    switch (report.report_type) {
      case "Invasão":
        return `Em ${report.city}: denúncia de ${report.invasion_vehicle.toLowerCase()} ${report.invasion_state.toLowerCase()} na ciclofaixa na "${report.address}", entre ${report.invasion_time}`
      case "Ameaça":
        return `Nova denúncia em ${report.city}: ameaça de um motorista de ${report.invasion_vehicle.toLowerCase()} ${plate} que "${report.description}" no endereço "${report.address}"`
      case "Manutenção":
        return `Em ${report.city}: denúncia de falta de manutenção de ${report.maintenance_type.toLowerCase()} na "${report.address}"`
      case "Ciclofaixa apagada":
        return `Em ${report.city}: denúncia de ciclofaixa apagada em "${report.address}"`
    }
  }
}

export default TwitterService
