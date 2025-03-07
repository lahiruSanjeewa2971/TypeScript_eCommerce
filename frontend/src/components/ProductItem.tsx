import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Products";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { convertProductToCartItem } from "../utils";
import { toast } from "react-toastify";

export default function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    console.log('addToCartHandler clicked.')
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.warn("Sorry, the product is out of stock.");
      return;
    }
    console.log('item :', item)
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...item,
        quantity,
      },
    });
    toast.success("Product added to the cart.");
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {/* <Rating product={product} /> */}
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light">Out of stock</Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
