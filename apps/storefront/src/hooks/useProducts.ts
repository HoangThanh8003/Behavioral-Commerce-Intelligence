'use client';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@nexusai/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useProducts = (categoryId?: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryId) params.set('categoryId', categoryId);
      const res = await fetch(`${API_URL}/products?${params}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      return res.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
