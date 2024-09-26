import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import { Product } from "../entity/Product.entity";
import { Cart } from "../entity/Cart.entity";
import { CartProduct } from "../entity/CartProduct.entity";
import { AppDataSource } from "../db/dataSource";

export const addToCart = async (req: Request, res: Response) => {
      const { userId, productId, quantity } = req.body;

      try {
            const userRepo = AppDataSource.getRepository(User);
            const productRepo = AppDataSource.getRepository(Product);
            const cartRepo = AppDataSource.getRepository(Cart);
            const cartProductRepo = AppDataSource.getRepository(CartProduct);

            const user = await userRepo.findOne({ where: { id: userId } });
            if (!user) {
                  return res.status(404).json({ message: 'User not found' });
            }

            const product = await productRepo.findOneBy({ id: productId });
            if (!product) {
                  return res.status(404).json({ message: 'Product not found' });
            }

            let cart = await cartRepo.findOne({
                  where: { user: { id: userId }, isCheckedOut: false },
                  relations: ['cartProducts', 'cartProducts.product']
            });
            // console.log("OldCart", cart)

            if (!cart) {
                  cart = cartRepo.create({ user });
                  await cartRepo.save(cart);
            }

            let cartProduct = cart.cartProducts.find(cp => cp.product.id === productId);

            if (cartProduct) {
                  cartProduct.quantity += quantity;
            } else {
                  cartProduct = cartProductRepo.create({
                        cart,
                        product,
                        quantity
                  });
                  cart.cartProducts.push(cartProduct);
            }

            await cartRepo.save(cart);

            res.status(200).json(cart);

      } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
      }
};

export const getCartByUserId = async (req: Request, res: Response) => {
      const { userId } = req.params;
      // console.log("UserId", userId)
      try {
            const cartRepo = AppDataSource.getRepository(Cart);

            const cart = await cartRepo.findOne({
                  where: { user: { id: userId }, isCheckedOut: false },
                  relations: ['cartProducts', 'cartProducts.product']
            });

            // console.log("Cart", cart);

            if (!cart) {
                  return res.status(404).json({ message: "Cart not found" });
            }

            res.status(200).json(cart);

      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
      }
};


export const updateCartQuantity = async (req: Request, res: Response) => {
      const { userId, productId, quantity } = req.body
      try {
            const cartRepo = AppDataSource.getRepository(Cart)
            const cartProductRepo = AppDataSource.getRepository(CartProduct)
            const cart = await cartRepo.findOne({
                  where: {
                        user: { id: userId }, isCheckedOut: false
                  }, relations: ['cartProducts', 'cartProducts.product']
            })
            if (!cart) {
                  return res.status(404).json({ message: "No Cart found" })
            }
            const cartProduct = cart.cartProducts.find(cp => cp.product.id === productId)
            if (!cartProduct) {
                  return res.status(404).json({ message: "Product Not Found" })
            }

            cartProduct.quantity = quantity

            await cartProductRepo.save(cartProduct)
            res.status(200).json(cart)
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
      }

}

export const removeProductFromCart = async (req: Request, res: Response) => {
      const { userId, productId } = req.body
      try {

            const cartRepo = AppDataSource.getRepository(Cart)
            const cartProductRepo = AppDataSource.getRepository(CartProduct)
            const cart = await cartRepo.findOne({ where: { user: { id: userId }, isCheckedOut: false }, relations: ['cartProducts', 'cartProducts.product'] })
            if (!cart) {
                  return res.status(404).json({ message: "No Cart found" })
            }
            const cartProduct = cart.cartProducts.find(cp => cp.product.id === productId)
            if (!cartProduct) {
                  return res.status(404).json({ message: "Product Not Found" })
            }
            await cartProductRepo.remove(cartProduct)
            res.status(200).json({ message: "Cart Removed successfully" })
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
      }

}