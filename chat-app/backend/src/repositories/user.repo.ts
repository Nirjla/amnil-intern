import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User extends BaseEntity {
      @PrimaryGeneratedColumn("uuid")
      id: string;

      @Column({ nullable: false })
      name: string;

      @Column({ nullable: false })
      email: string;

      @Column({ nullable: false })
      password: string;

      @CreateDateColumn()
      created_at: Date;

      @UpdateDateColumn()
      updated_at: Date;
}