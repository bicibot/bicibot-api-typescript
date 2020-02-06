import cron from "node-cron"
import signale from "signale"
import * as nodemailer from "nodemailer"
import PDFService from "./PDFService"

// TODO: Implement mailer and send reportMail every week
// Send reports for the current week, if there are not reports, then send a message sayind that

class MailerService {
    private config;

    private _transporter: nodemailer.Transporter;

    private mailOptions;

    private _PDFService: PDFService;

    public constructor () {
      this._PDFService = new PDFService()
      this._transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "florencio.fritsch@ethereal.email",
          pass: "e3Pexw282zmsDWSm9C"
        }
      })

      this.mailOptions = {
        from: "from_test@gmail.com",
        to: "iacapuca@gmail.com",
        subject: "Hello",
        text: "Hello from node.js"
      }

      cron.schedule("* * * * *", () => {
        signale.info("Sending email report")
        this.sendMail("iacapuca@gmail.com", "Email test", "Testando envio do email")
      })
    }

    public async sendMail (to: string, subject: string, content: string): Promise<void> {
      this.mailOptions.to = to
      this.mailOptions.subject = subject
      this.mailOptions.text = content
      this.mailOptions.attachments = [{ filename: "report.pdf", content: await this._PDFService.generateReport() }]

      return new Promise<void>((resolve: (msg: any) => void,
        reject: (err: Error) => void) => {
        this._transporter.sendMail(
          this.mailOptions, (error, info) => {
            if (error) {
              signale.fatal(`error: ${error}`)
              reject(error)
            } else {
              signale.success(`Message Sent ${info.response}`)
            }
          })
      })
    }
}

export default MailerService
