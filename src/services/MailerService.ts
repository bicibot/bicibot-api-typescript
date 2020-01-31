import cron from "node-cron"
import signale from "signale"
import nodemailer from "nodemailer"

//TODO: Implement mailer and send reportMail every week
// Create PDF file that should be send with the mail, the content of the PDF should be the report as a table

class MailerService {
    private config;

    public constructor () {
      cron.schedule("* * * * * *", () => {
        this.sendMail()
      })
    }

    public async sendMail () {
    }
}

export default MailerService
