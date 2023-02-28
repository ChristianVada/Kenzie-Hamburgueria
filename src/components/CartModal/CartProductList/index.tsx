import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { useCartContext } from '../../../hooks/useCartContext';

const CartProductList = () => {
  const { currentIten, totalCart, setCurrentIten } = useCartContext();

  return (
    <StyledCartProductList>
      <ul>
        {currentIten.map((iten) => (
          <CartProductCard
            key={iten.id}
            category={iten.category}
            id={iten.id}
            img={iten.img}
            name={iten.name}
            price={iten.price}
          />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>R$ {totalCart}</StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => setCurrentIten([])}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
