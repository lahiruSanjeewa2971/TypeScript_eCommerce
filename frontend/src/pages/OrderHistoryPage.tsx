import { useNavigate } from "react-router-dom";
import { useGetOrderHistoryQuery } from "../hooks/orderHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { APIError } from "../types/APIErrors";
import { Button } from "react-bootstrap";

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

  return (
    <div>
      <h1>Order History</h1>
      {isLoading ? (
        <>
          <LoadingBox></LoadingBox>
        </>
      ) : error ? (
        <>
          <MessageBox varient="danger">
            {getError(error as unknown as APIError)}
          </MessageBox>
        </>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders!.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
