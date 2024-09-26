import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Checkout } from "./Checkout.entity";
import { Cart } from "./Cart.entity";
@Entity({ name: "users" })

export class User extends BaseEntity {
      @PrimaryGeneratedColumn("uuid")
      id: string;

      @Column({ default: null })
      google_id: string

      @Column({ nullable: false })
      name: string;

      @Column({ nullable: false })
      email: string

      @Column({ nullable: true })
      password?: string

      @Column({ default: "user" })
      role: string

      @OneToMany(() => Cart, cart => cart.user)
      carts: Cart[]

      @OneToMany(() => Checkout, checkout => checkout.user)
      checkouts: Checkout[]

      @CreateDateColumn()
      createdAt: Date;

      @UpdateDateColumn()
      updatedAt: Date
}
