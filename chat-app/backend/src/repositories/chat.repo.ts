import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.repo";
import { Message } from "./message.repo";

@Entity({ name: 'chat' })
export class ChatRoom extends BaseEntity {
      @PrimaryGeneratedColumn('uuid')
      id: string

      @Column({ nullable: false })
      name: string

      @Column({ nullable: true })
      description: string

      @ManyToOne(() => User, user => user.createdRooms)
      @JoinColumn()
      creator: User

      @OneToMany(() => Message, message => message.chatRoom)
      messages: Message[]

      @CreateDateColumn()
      created_at: Date;

      @UpdateDateColumn()
      updated_at: Date;

}