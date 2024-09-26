import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import { Cart } from "../entity/Cart.entity";
import { CartProduct } from "../entity/CartProduct.entity"; // Assuming you have a CartProduct entity
import { Checkout } from "../entity/Checkout.entity";
import { AppDataSource } from "../db/dataSource";

export const createCheckout = async (req: Request, res: Response) => {
      const { userId, paymentMethod, shippingAddress } = req.body;
      try {
            const checkoutRepo = AppDataSource.getRepository(Checkout);
            const userRepo = AppDataSource.getRepository(User);
            const cartRepo = AppDataSource.getRepository(Cart);
            const cartProductRepo = AppDataSource.getRepository(CartProduct);

            const user = await userRepo.findOneBy({ id: userId });
            if (!user) {
                  return res.status(404).json({ message: "No User Found" });
            }

            const cart = await cartRepo.findOne({
                  where: { user: { id: userId }, isCheckedOut: false },
                  relations: ['cartProducts', 'cartProducts.product']
            });

            if (!cart || cart.cartProducts.length === 0) {
                  return res.status(400).json({ message: "Cart is empty or already checked out" });
            }

            const totalAmount = cart.cartProducts.reduce((sum, cartProduct) => {
                  return sum + cartProduct.product.price * cartProduct.quantity;
            }, 0);

            const checkout = checkoutRepo.create({
                  user,
                  cart,
                  totalAmount,
                  paymentMethod,
                  shippingAddress,
                  paymentStatus: 'pending', 
            });
            await checkoutRepo.save(checkout);

            cart.isCheckedOut = true;
            await cartRepo.save(cart);

            await cartProductRepo.remove(cart.cartProducts);

            res.status(201).json({ message: 'Checkout created successfully and cart items cleared' });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
      }
};

