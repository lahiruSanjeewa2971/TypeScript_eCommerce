import jwt from "jsonwebtoken";
import { User } from "./models/UserModels";

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
