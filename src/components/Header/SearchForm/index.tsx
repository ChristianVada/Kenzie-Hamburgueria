import { MdSearch } from 'react-icons/md';
import { useState } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { useCartContext } from '../../../hooks/useCartContext';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const { setFilteredProducts } = useCartContext();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilteredProducts(searchValue);
    setSearchValue('');
  };

  return (
    <StyledSearchForm onSubmit={submit}>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        onChange={(event) => {
          setSearchValue(event.target.value);
          setFilteredProducts(event.target.value);
        }}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
