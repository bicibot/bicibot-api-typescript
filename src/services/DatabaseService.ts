import mongoose from "mongoose"
import signale from "signale"
require("dotenv").config()

class DatabaseService {
  public async connect (): Promise<void> {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.user}:${process.env.pw}@${process.env.DB_HOST}/${process.env.DB_ENV}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      signale.success("Database connection successful")
    } catch (err) {
      signale.fatal("Database connection error")
      console.error(err)
    }
  }
}

export default DatabaseService
