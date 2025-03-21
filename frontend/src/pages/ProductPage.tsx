import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlug } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../utils";
import { APIError } from "../types/APIErrors";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";

export default function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductDetailsBySlug(slug!); //slug can be sting or undefined. that's why !
  // above refetch - A function to manually refetch the query

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product?._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn("Sorrt. Product is out of stock.");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart.");
    navigate("/cart");
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox varient="danger">
      {getError(error as unknown as APIError)}
    </MessageBox>
  ) : !product ? (
    <MessageBox varient="danger">Product Not Found.</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img src={product.image} className="large" alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating}></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary" onClick={addToCartHandler}>Add to cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
