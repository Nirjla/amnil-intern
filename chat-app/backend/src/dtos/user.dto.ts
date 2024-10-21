import { text } from "express";

export class CreateUserDTO {
      name: string;
      email: string;
      password: string
}

export class UserResponseDTO {
      id: string
      name: string;
      email: string;
      token?: string
}


export class LoginUserDTO {
      email: string;
      password: string
}

export class CreateChatRoomDTO {
      name: string;
      description?: string;
}

export class CreateMessageDTO {
      content: string;
      chatRoomId: string;
}