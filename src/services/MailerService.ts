import cron from "node-cron"
import signale from "signale"
import sgMail from "@sendgrid/mail"
import PDFService from "./PDFService"

// TODO: Create Email facade and use OOP better practices on this Service

class MailerService {
    protected sendGrid: any;

    private _PDFService: PDFService;

    /**
     * @constructor
     */
    public constructor () {
      this._PDFService = new PDFService()
      this.sendGrid = sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      cron.schedule("*/10 * * * * *", () => {
        signale.info("Sending email report")
        this.sendMail("iacapuca@gmail.com", "no-reply@bicibot.org", "Email test", "Testando envio do email")
      })
    }

    public async sendMail (to: string, from: string, subject: string, content: string): Promise<void> {
      const pdf = await this._PDFService.generateReport()
      const msg = { to: to,
        from: from,
        subject: subject,
        text: content,
        attachments: [
          {
            content: Buffer.from(pdf).toString("base64"),
            filename: "report.pdf",
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
