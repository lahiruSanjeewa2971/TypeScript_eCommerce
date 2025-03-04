import express, { Request, Response } from "express";
import { sampleProducts } from "./data";
import cors from "cors";

const PORT = 5000;
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
