import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Product } from "../entity/Product.entity";
import { IImageData, IProductCreationRequest, } from "../interfaces/interfaces";
import { DeepPartial, Repository } from "typeorm";

export const createProducts = async (req: IProductCreationRequest, res: Response) => {
      const { name, price, description } = req.body;
      const { file } = req;

      let imageData: IImageData = {};
      if (file) {
            imageData = {
                  imageUrl: file.path,
                  imagePublicId: file.filename
            };
      }
      console.log("FileIamg", file)

      const productRepo = AppDataSource.getRepository(Product);
      try {
            const newProduct = productRepo.create({
                  name,
                  price,
                  description,
                  imageUrl: imageData.imageUrl || null,
                  imagePublicId: imageData.imagePublicId || null
            } as DeepPartial<Product>);

            await productRepo.save(newProduct);

            res.status(201).json({
                  message: 'Product created successfully',
                  product: newProduct
            });

      } catch (err) {
            console.error(err);
            res.status(500).json({
                  message: "Error creating product",
            });
      }
};


export const getProducts = async (req: Request, res: Response) => {
      try {
            const productRepo = AppDataSource.getRepository(Product)
            const products = await productRepo.find()
            if (products.length === 0) {
                  return res.status(400).json({ message: "No Products Found" })
            }
            res.status(200).json({ product: products })
      } catch (err) {
            console.error(err)
            return res.status(500).json({ message: "Internal server error" })
      }

}

export const getProductById = async (req: Request, res: Response) => {
      const { id } = req.params
      try {
            const productRepo = AppDataSource.getRepository(Product);
            const product = await productRepo.findOneBy({ id })
            if (!product) {
                  return res.status(400).json({ message: "No Product found" })
            }
            res.status(200).json({ product: product })
      } catch (err) {
            console.error(err)
            return res.status(500).json({ message: "Internal server error" })
      }

}


export const deleteProductById = async (req: Request, res: Response) => {
      const { id } = req.params
      try {
            const productRepo = AppDataSource.getRepository(Product)
            const product = await productRepo.findOneBy({ id })
            if (!product) {
                  return res.status(400).json({ message: "Product Not Found" })
            }
            await productRepo.remove(product)
            res.status(200).json({ message: "Product deleted successfully" })
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" })
      }
}