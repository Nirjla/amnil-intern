
import express, { Request, Response } from "express";
import * as dotenv from "dotenv"
import "reflect-metadata"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { AppDataSource } from "./db/dataSource";
import { indexRouter } from "./routes/index.routes";
import { swaggerSpec } from "./config/swaggerConfig";
import morganConfig from "./config/morganConfig";
import './config/passportConfig'
import passport from "passport";
import session from "express-session"
dotenv.config()

const app = express();

app.use(session({
      secret: 'SESIOSNE',
      resave: false,
      saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(morganConfig)

app.use(express.json());

const { PORT, DB_PORT } = process.env
const corsOptions = {
      origin: ['http://localhost:5173', 'http://localhost:5174'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}
app.use(cors(corsOptions))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api', indexRouter)

app.get("*", (req: Request, res: Response) => {
      res.status(404).json({ message: "Not Found" })
})

// console.log("PORT:", process.env.PORT);
// console.log("DB_HOST:", process.env.DB_HOST);

AppDataSource.initialize().then(async () => {
      app.listen(PORT, () => {
            console.log(`*******Server is running on ${PORT}*****`)
      });
      console.log(`Database has been connected ${DB_PORT}`)
}).catch((err) => console.log(err))


