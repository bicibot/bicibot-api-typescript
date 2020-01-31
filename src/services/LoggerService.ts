// TODO: Create LoggerService and consume ingestToken from .env
import { createLogger, format } from "winston"
import HumioTransport from "humio-winston"

const { combine, timestamp, prettyPrint } = format
const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new HumioTransport({
      ingestToken: ""
    })
  ],
  exitOnError: false
})

logger.info("Hello, world!")

export default logger
