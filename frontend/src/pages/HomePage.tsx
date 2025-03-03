import { Col, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import { Product } from "../types/Products";
import { useEffect, useReducer } from "react";
import { getError } from "../utils";
import { APIError } from "../types/APIErrors";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | {
      type: "FETCH_SUCCESS";
      payload: Product[];
    }
  | {
      type: "FETCH_FAIL";
      payload: string;
    };

const initialState: State = {
  products: [],
  loading: false,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  // const [{loading, error, products}, dispatch] = useReducer<
  //   State, Action
  // >(reducer, initialState)
  const [{ loading, error, products }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error as APIError) });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox varient="danger">{error}</MessageBox>
  ) : (
    <Row>
      {/* Set tab name */}
      <Helmet>
        <title>eCommerce</title>
      </Helmet>
      {/**Row contains 12 parts */}
      {sampleProducts.map((product, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
