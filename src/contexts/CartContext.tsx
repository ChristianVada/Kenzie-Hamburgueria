import { createContext, useEffect, useState, ReactNode, Dispatch } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ICartContext {
  products: IProduct[];
  setProducts: Dispatch<React.SetStateAction<IProduct[]>>;
  addToCart: (itenId: number) => void;
  removeFromCart: (itenId: number) => void;
  currentIten: IProduct[];
  setCurrentIten: Dispatch<React.SetStateAction<IProduct[]>>;
  totalCart: number;
  filteredProducts: string;
  setFilteredProducts: Dispatch<React.SetStateAction<string>>;
  searchProductsOnList: IProduct[];
}

interface ICartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<ICartContext | null>(null);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentIten, setCurrentIten] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState('');

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
          console.error(error);
        }
      };
      getProducts();
    }
  }, []);

  const addToCart = (itenId: number) => {
    const findProduct = products.find((product) => product.id === itenId);
    if (findProduct) {
      if (currentIten.includes(findProduct)) {
        toast.warn('Item já adcionado');
      } else {
        setCurrentIten([...currentIten, findProduct]);
      }
    }
  };

  const removeFromCart = (itenId: number) => {
    const newListCart = currentIten.filter((iten) => iten.id !== itenId);
    setCurrentIten(newListCart);
  };

  const totalCart = currentIten.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice.price,
    0
  );

  const searchProductsOnList = products.filter((product) =>
    filteredProducts === ''
      ? true
      : product.name.toLowerCase().includes(filteredProducts.toLowerCase())
  );

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        addToCart,
        removeFromCart,
        currentIten,
        setCurrentIten,
        totalCart,
        filteredProducts,
        setFilteredProducts,
        searchProductsOnList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
