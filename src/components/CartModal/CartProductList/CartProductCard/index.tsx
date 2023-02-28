import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { useCartContext } from '../../../../hooks/useCartContext';

interface ICartProductCardProps {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
}

const CartProductCard = ({
  category,
  id,
  img,
  name,
  price,
}: ICartProductCardProps) => {
  const { removeFromCart } = useCartContext();

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => removeFromCart(id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
