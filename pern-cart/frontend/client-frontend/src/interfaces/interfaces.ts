export interface Product {
      id: string;
      name: string;
      description: string,
      imageUrl: string,
      price: number,
      imagePublicId: string

}

export interface IUserCredentials {
      message: string,
      token: string
}

export interface ICartProduct {
      id: string;
      quantity: number,
      product: {
            id: string,
            name: string,
            price: number,
            description: string,
            imagePublicId: string,
            imageUrl: string,
      }
}

export interface ICart {
      id: string,
      userId: string,
      cartProducts: ICartProduct[],
      isCheckout: boolean
}