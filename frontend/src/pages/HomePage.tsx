import { Col, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import { Link } from "react-router-dom";
import { Product } from "../types/Products";
import React, { useReducer } from "react";

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
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  // const [] = useReducer<React.Reducer<State, Action>>()


  return (
    <Row>
      {/**Row contains 12 parts */}
      {sampleProducts.map((product, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          <Link to={"/product/" + product.slug}>
            <img src={product.image} alt="" className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.slug}</p>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
