import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isAuth } from "../utils";
import { OrdertModel } from "../models/OrderModel";
import { Product } from "../models/ProductModel";
export const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: "Cart is empty." });
    } else {
      const createdOrder = await OrdertModel.create({
        orderItems: req.body.orderItems.map((singleItem: Product) => ({
          ...singleItem,
          product: singleItem._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      res.status(201).json({ message: "Order placed.", order: createdOrder });
    }
  })
);
