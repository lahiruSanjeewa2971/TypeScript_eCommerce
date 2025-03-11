import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/ProductModel";
import { sampleProducts, sampleUsers } from "../data";
import { UserModel } from "../models/UserModels";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUseres = await UserModel.insertMany(sampleUsers);

    res.json({ createProducts, createdUseres });
  })
);
