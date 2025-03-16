import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sampleProducts } from "./data";
import cors from "cors";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouters";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";

dotenv.config();

const PORT = 5000;
const MONGO_URI = process.env.DB_CONNECTION;
mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI!)
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch(() => {
    console.log("Cannot connected to mongodb.");
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/seed", seedRouter);

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
