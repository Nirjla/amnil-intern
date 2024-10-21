import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./message.repo";
import { ChatRoom } from "./chat.repo";

@Entity({ name: 'user' })
export class User extends BaseEntity {
      @PrimaryGeneratedColumn("uuid")
      id: string;

      @Column({ nullable: false })
      name: string;

      @Column({ nullable: false, unique: true })
      email: string;

      @Column({ nullable: false })
      password: string;

      @Column({ default: false })
      isOnline: boolean

      @OneToMany(() => Message, message => message.sender)
      messages: Message[]

      @OneToMany(() => ChatRoom, chatRoom => chatRoom.creator)
      createdRooms: ChatRoom[]

      @CreateDateColumn()
      created_at: Date;

      @UpdateDateColumn()
      updated_at: Date;
}