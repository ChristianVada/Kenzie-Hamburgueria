import { useState } from 'react';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  name: string;
  password: string;
}

const LoginForm = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState('');

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input label={'Nome'} {...register('name')} />
      <Input label={'Senha'} {...register('password')} />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
