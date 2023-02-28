import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../services/api';

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface ICartContext {
  products: IProduct[];
}

export interface ICartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<ICartContext | null>(null);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN-BURGER');
    if (token) {
      const getProducts = async () => {
        try {
          const response = await api.get('/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(response.data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      };
      getProducts();
    }
  }, []);

  return (
    <CartContext.Provider value={{ products }}>{children}</CartContext.Provider>
  );
};
