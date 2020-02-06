import cron from "node-cron"
import signale from "signale"
import sgMail from "@sendgrid/mail"
import PDFService from "./PDFService"
import moment from "moment"

// TODO: Create Email facade and use OOP better practices on this Service

class MailerService {
    protected sendGrid: any;

    private _PDFService: PDFService;

    public static FROM_EMAIL: string = "no-reply@bicibot.org";
    public static FROM_NAME: string = "Bicibot";
    public static CONTENT: string = "Segue em anexo relátorio da semana"

    /**
     * @constructor
     */
    public constructor () {
      this._PDFService = new PDFService()
      this.sendGrid = sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      cron.schedule("*/10 * * * * *", () => {
        signale.info("Sending email report")
        this.sendMail("iacapuca@gmail.com")
      })
    }

    public getSubject () {
      const today = moment()
      let fromDate = today.startOf("week").format("DD/MM/YYYY")
      let toDate = today.endOf("week").format("DD/MM/YYYY")
      return `Relátorio Bicibot ${fromDate} - ${toDate}`
    }

    private async sendMail (to: string): Promise<void> {
      const pdf = await this._PDFService.generateReport()
      const msg = { to: to,
        from: { email: MailerService.FROM_EMAIL, name: MailerService.FROM_NAME },
        subject: this.getSubject(),
        text: MailerService.CONTENT,
        attachments: [
          {
            content: Buffer.from(pdf).toString("base64"),
            filename: "Bicibot - Report.pdf",
            type: "application/pdf",
            disposition: "attachment"
          }
        ]
      }

      sgMail.send(msg).then(() => {
        signale.success("Email sent")
      }, err => {
        signale.fatal(err)
      })
    }
}

export default MailerService
