import express, { Request, Response } from "express"
import cors from "cors"
import { appDataSource } from "./configs/db.config"
import constants from "./constants"
import { createServer } from "http"
import { SocketService } from "./services/socket.service"
import { consumeMessage, runProducer } from "./services/kafka.service"
const { SERVER, DB } = constants
const app = express()

const socketService = new SocketService()

app.use(cors({ origin: '*' }))
app.use(express.json())
async function init() {
      const httpServer = createServer(app)
      socketService.io.attach(httpServer)
      httpServer.listen(SERVER.SERVER_PORT, () => {
            console.log(`*****Server is running on ${SERVER.SERVER_PORT}***********`)
      })
      socketService.initListeners()
      runProducer().catch(console.error)
      consumeMessage(socketService).catch(console.error)


}

appDataSource.initialize().then(async () => {
      init()
      console.log(`Database connected on ${DB.DB_PORT}`)
})
app.get('*', (req: Request, res: Response) => {
      res.status(404).json({ message: "Not Found" })
})


