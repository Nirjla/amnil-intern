import { Request } from "express"
export interface IUser {
      id: string,
      role: string
}


export interface IAuthenticatedRequest extends Request {
      user?: IUser
}

export interface IParams {
      folder?: string,
      allowedFormats?: string[]
}

export interface IImageData {
      imageUrl?: string,
      imagePublicId?: string
}

export interface IProductRequestBody {
      name: string,
      price: number,
      description: string
}

export interface IProductCreationRequest extends Request {
      file?: Express.Multer.File,
      body: IProductRequestBody

}