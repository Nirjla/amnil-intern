import { Request, Response } from "express"
import morgan from "morgan"

morgan.token('host', (req: Request, res: Response) => {
      // console.log(req)
      return req.hostname
})

const morganConfig = morgan('Date: :date - :method - :url - Host: :host - :status - Size: :res[content-length] bytes - Response Time: :response-time ms - User-agent: :user-agent')

export default morganConfig