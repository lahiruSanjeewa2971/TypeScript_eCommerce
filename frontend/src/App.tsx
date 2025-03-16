import { useContext } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {
    state: { cart, userInfo },
    dispatch,
  } = useContext(Store);

  const signOutHandler = () => {
    // dispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

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
            {/* <a href="/signin" className="nav-link">
              Sign Up
            </a> */}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                {/* <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer> */}
                <Link to="/orderhistory">Order Histry</Link>
                <Link
                  to="#sigout"
                  className="dropdown-item"
                  onClick={signOutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
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
