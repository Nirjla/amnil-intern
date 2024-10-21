import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.repo";
import { ChatRoom } from "./chat.repo";

@Entity({ name: 'message' })
export class Message extends BaseEntity {
      @PrimaryGeneratedColumn('uuid')
      id: string

      @Column({ nullable: false, type: 'text' })
      content: string

      @ManyToOne(() => User, (user) => user.messages, { nullable: false })
      @JoinColumn()
      sender: User

      @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages, { nullable: false })
      @JoinColumn()
      chatRoom: ChatRoom

      @CreateDateColumn()
      created_at: Date;

      @UpdateDateColumn()
      updated_at: Date;
}