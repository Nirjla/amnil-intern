// import { Pool } from "pg"
import constants from "../constants/index"
const { DB } = constants
// class Database {
//       private pool: Pool;
//       constructor() {
//             const config = {
//                   host: DB.DB_HOST,
//                   port: DB.DB_PORT,
//                   user: DB.DB_USER,
//                   password: DB.DB_PASSWORD,
//                   database: DB.DB_NAME,
//             }
//             this.pool = new Pool(config)

import { DataSource } from "typeorm";
import { User } from "../repositories/user.repo";

//       }
//       async query(text: string, params?: any[]) {
//             const client = await this.pool.connect();
//             try {
//                   return await client.query(text, params)
//             } finally {
//                   client.release()
//             }
//       }
//       async close() {
//             await this.pool.end()
//       }
// }
// export const db = new Database()

export const AppDataSource = new DataSource({
      type: 'postgres',
      host: DB.DB_HOST,
      port: DB.DB_PORT,
      username: DB.DB_USER,
      password: DB.DB_PASSWORD,
      database: DB.DB_NAME,
      synchronize: true,
      logging: false,
      entities: [User],

})