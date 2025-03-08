import { useContext } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {
    state: { cart },
  } = useContext(Store);

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            {/* <LinkContainer to="/"> */}
            <Link to="/" className="text-decoration-none">
              <Navbar.Brand>eCommerce</Navbar.Brand>
            </Link>
            {/* </LinkContainer> */}
          </Container>
          <Nav>
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <a href="/signin" className="nav-link">
              Sign Up
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All right reserved.</div>
      </footer>
    </div>
  );
}

export default App;
