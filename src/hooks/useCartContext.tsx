import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const useCartContext = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw 'Erro, contexto não encontrado';
  }
  return cartContext;
};
