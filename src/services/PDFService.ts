import puppeteer from "puppeteer"
import hbs from "handlebars"
import path from "path"
import fs from "fs-extra"
import moment from "moment"
import { Report } from "../schemas/Report"

class PDFService {
  private async compileReport (templateName: string, reports, week) {
    const filePath = path.join("src", "templates", `${templateName}.hbs`)
    const html = await fs.readFile(filePath, "utf-8")
    hbs.registerHelper("formatDate", function (date) {
      return moment(date).format("DD/MM/YYYY")
    })
    return hbs.compile(html)({ reports, week }, { allowProtoPropertiesByDefault: true })
  }

  private getWeek () {
    const today = moment()
    const fromDate = today.startOf("week").format("DD/MM/YYYY")
    const toDate = today.endOf("week").format("DD/MM/YYYY")

    return `${fromDate} - ${toDate}`
  }

  private async retrieveReports () {
    const today = moment()
    const fromDate = today.startOf("week")
    const toDate = today.endOf("week")

    return Report.find({
      "created_at":
          {
            $gte: fromDate,
            $lte: toDate
          }
    })
  }

  public async generateReport () {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const reports = await this.retrieveReports()
    const content = await this.compileReport("report", reports, this.getWeek())

    await page.setContent(content)
    const pdf = await page.pdf({ format: "A4" })

    await browser.close()

    return pdf
  }
}

export default PDFService
