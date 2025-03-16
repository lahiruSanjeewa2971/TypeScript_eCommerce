import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useCreateOrderMutation } from "../hooks/orderHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { APIError } from "../types/APIErrors";
import CheckoutSteps from "../components/CheckoutSteps";
import { Card, Col, Row } from "react-bootstrap";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const {
    dispatch,
    state: { cart, userInfo },
  } = useContext(Store);

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder } = useCreateOrderMutation();

  const createOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItems("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error as APIError));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name :</strong>
                {cart.shippingAddress.fullName} <br />
                <strong>Address :</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode}.{" "}
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping"></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
