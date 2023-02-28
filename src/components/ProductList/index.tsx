import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { IProduct } from '../../contexts/CartContext';
import { useCartContext } from '../../hooks/useCartContext';

const ProductList = () => {
  const { products } = useCartContext();
  return (
    <StyledProductList>
      {products.map((product: IProduct) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          category={product.category}
          img={product.img}
          price={product.price}
        />
      ))}
    </StyledProductList>
  );
};
export default ProductList;
