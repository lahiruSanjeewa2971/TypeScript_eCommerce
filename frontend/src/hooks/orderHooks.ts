import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem, ShippingAddress } from "../types/Cart";
import apiClient from "../apiClient";
import { Order } from "../types/Order";

// GET use useQuery
export const useGetOrderDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
  });
};

export const useGetOrderHistoryQuery = () => {
  return useQuery({
    queryKey: ["order-history"],
    queryFn: async () => (await apiClient.get<Order[]>(`api/orders/mine`)).data,
  });
};

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  });
};
