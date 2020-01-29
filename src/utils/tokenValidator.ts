import loggger from "../services/LoggerService"
import { Request, Response, NextFunction } from "express"
require("dotenv").config()

class TokenValidator {
  public async validateToken (req: Request, res: Response, next: NextFunction): Promise<void> {
    const authToken = req.header("authToken")
    if (authToken) {
      if (authToken === process.env.authToken) {
        next()
      } else {
        let result = {
          error: "Authentication error. Token required.",
          status: 401
        }
        res.status(401).send(result)
      }
    } else {
      let result = {
        error: "Authentication error. AuthToken required.",
        status: 401
      }
      res.status(401).send(result)
    }
  }
}

export default new TokenValidator()
