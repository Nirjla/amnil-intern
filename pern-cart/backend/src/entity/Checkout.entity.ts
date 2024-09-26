import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Cart } from "./Cart.entity";

@Entity({ name: "checkout" })
export class Checkout extends BaseEntity {
      @PrimaryGeneratedColumn('uuid')
      id: string

      @ManyToOne(() => User, user => user.checkouts, { nullable: false })
      user: User

      @OneToOne(() => Cart, { nullable: false })
      @JoinColumn()
      cart: Cart

      @Column({ type: 'decimal' })
      totalAmount: number

      @Column({ type: 'enum', enum: ['pending', 'paid', 'failed'], default: 'pending' })
      paymentStatus: 'pending' | 'paid' | 'failed'

      @Column({ nullable: true })
      paymentMethod: string

      @Column({ nullable: true })
      shippingAddress: string
}