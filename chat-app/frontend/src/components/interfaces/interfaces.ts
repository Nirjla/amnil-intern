export interface IUserResponse {
      id: string;
      name: string,
      email: string,
      token: string
}

export interface IUserLists {
      name: string,
      email: string
}

export interface IResponse<T> {
      success: boolean,
      message: string
      data?: T
}

export interface IGetUsers {
      name: string,
      email: string
}

export interface IChatMembers {
      id: string,
      members: string[]
}

// types.ts
export interface Message {
      id: string;
      content: string;
      sender: {
            id: string,
            name: string
      };
      created_at: string
}


export interface ChatRoom {
      id: string;
      name: string;
      description?: string;
      participants: IUserResponse[];
      createdAt: Date;
      lastActivity: Date;
}


export interface IChatRoom {
      id: string
      name: string;
      description: string
      created_at: string
      creator: {
            id: string
            name: string
            email: string
      }
}