import dotenv from "dotenv"
dotenv.config()
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, SERVER_PORT, DB_PORT } = process.env
const constants = {
      DB: {
            DB_HOST: DB_HOST,
            DB_PORT: parseInt(DB_PORT || '5432'),
            DB_USER: DB_USER,
            DB_PASSWORD: DB_PASSWORD,
            DB_NAME: DB_NAME
      },
      SERVER: {
            SERVER_PORT: parseInt(SERVER_PORT || '3000')
      }
}
export default constants