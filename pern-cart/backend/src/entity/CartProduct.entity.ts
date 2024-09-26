import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart.entity";
import { Product } from "./Product.entity";

@Entity({ name: 'cart_products' })
export class CartProduct extends BaseEntity {
      @PrimaryGeneratedColumn('uuid')
      id: string

      @ManyToOne(() => Cart, cart => cart.cartProducts, { nullable: false })
      cart: Cart

      @ManyToOne(() => Product, { nullable: false })
      product: Product

      @Column({ type: 'int', default: 1 })
      quantity: number



}