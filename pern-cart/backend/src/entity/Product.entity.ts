import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./Cart.entity";

@Entity({ name: 'products' })
export class Product extends BaseEntity {
      @PrimaryGeneratedColumn('uuid')
      id: string

      @Column({ nullable: false })
      name: string

      @Column({ type: 'decimal', nullable: false })
      price: number

      @Column({ nullable: false })
      description: string

      @Column({ nullable: false })
      imagePublicId: string

      @Column({ nullable: false })
      imageUrl: string

      @CreateDateColumn()
      createdAt: Date;

      @UpdateDateColumn()
      updatedAt: Date



}