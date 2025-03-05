import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sampleProducts } from "./data";
import cors from "cors";
import mongoose from "mongoose";

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

app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});

app.get("/api/products/:slug", (req: Request, res: Response) => {
  res.json(sampleProducts.find((x) => x.slug === req.params.slug));
});

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
