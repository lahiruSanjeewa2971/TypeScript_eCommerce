import jwt from "jsonwebtoken";
import { User } from "./models/UserModels";
import { Request, Response, NextFunction } from "express";

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecretHere101",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  // console.log("authorization", authorization);
  
  if (authorization) {
    const token = authorization.split(" ")[1]; // Safer way to extract token
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecretHere101"
    );
    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).json({ message: "No token provided." });
  }
};
