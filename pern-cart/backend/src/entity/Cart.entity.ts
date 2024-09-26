import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { CartProduct } from "./CartProduct.entity";

@Entity({ name: 'cart' })
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, user => user.carts, { nullable: false })
  user: User;

  @OneToMany(() => CartProduct, cartProduct => cartProduct.cart, { cascade: true, eager: true })
  cartProducts: CartProduct[];


  @Column({ type: 'boolean', default: false })
  isCheckedOut: boolean;
}
