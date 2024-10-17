export class CreateUserDTO {
      name: string;
      email: string;
      password: string
}

export class UserResponseDTO {
      name: string;
      email: string;
      token?: string
}


export class LoginUserDTO {
      email: string;
      password: string
}