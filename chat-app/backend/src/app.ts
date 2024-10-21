import express, { Request, Response } from "express"
import cors from "cors"
import { AppDataSource } from "./configs/db.config"
import constants from "./constants"
import { SocketService } from "./services/socket.service"
import { consumeMessage, runProducer } from "./services/kafka.service"
import router from "./routes/index.route"
import { Server } from "socket.io"
const { SERVER, DB } = constants
import { createServer } from 'http'
const app = express()
app.use(express.json())
// Middleware to parse JSON
const httpServer = createServer(app)
const io = new Server(httpServer, {
      cors: {
            origin: "http://localhost:5173",
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Authorization'],
            credentials: true
      }, transports: ['websocket']
})

app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:5174'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
}))

app.use('/api', router)


AppDataSource.initialize().then(async () => {
      // init()
      httpServer.listen(SERVER.SERVER_PORT, () => {
            console.log(`*****Server is running on ${SERVER.SERVER_PORT}***********`)
            new SocketService(io)
      })
      console.log(`Database connected on ${DB.DB_PORT}`)
}).catch(error => console.error('Error starting server', error))


app.get('*', (req: Request, res: Response) => {
      res.status(404).json({ message: "Not Found" })
})


