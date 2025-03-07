import { APIError } from "./types/APIErrors";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Products";

export const getError = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as APIError).response?.data?.message === "string"
  ) {
    return (error as APIError).response.data.message;
  }

  return (error as Error)?.message || "An unknown error occurred";
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  };
  return cartItem;
};
