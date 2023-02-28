import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const useCartContext = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    // eslint-disable-next-line no-throw-literal
    throw 'Erro, contexto não encontrado';
  }
  return cartContext;
};
