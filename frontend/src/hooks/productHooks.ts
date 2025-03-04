import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Products";

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ["products"], //this means, save this query in cache with this name
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  });
};

export const useGetProductDetailsBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${slug}`)).data,
  });
};
