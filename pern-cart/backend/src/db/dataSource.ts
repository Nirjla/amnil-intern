import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entity/User.entity";
import { Product } from "../entity/Product.entity";
import { Cart } from "../entity/Cart.entity";
import { CartProduct } from "../entity/CartProduct.entity";
import { Checkout } from "../entity/Checkout.entity";
dotenv.config()
const { DB_HOST, DB_USERNAME, DB_PORT, DB_DATABASE, DB_PASSWORD } = process.env

export const AppDataSource = new DataSource({
      type: 'postgres',
      host: DB_HOST,
      port: parseInt(DB_PORT || "5432"),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      synchronize: true, //
      logging: false, //if true shows all the queries bts
      entities: [User, Product, Cart, CartProduct, Checkout],
      migrations: []

})