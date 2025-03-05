import { Col, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { APIError } from "../types/APIErrors";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox varient="danger">{getError(error as unknown as APIError)}</MessageBox>
  ) : (
    <Row>
      {/* Set tab name */}
      <Helmet>
        <title>eCommerce</title>
      </Helmet>
      {/**Row contains 12 parts */}
      {products!.map((product, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
