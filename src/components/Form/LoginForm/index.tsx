import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { useUserContext } from '../../../hooks/useUserContext';

export interface IFormLogin {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email('E-mail deve ser um e-mail válido')
      .required('E-mail é um campo obrigatório'),
    password: yup.string().required('Senha é um campo obrigatório'),
  })
  .required();

const LoginForm = () => {
  const { loginUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    loginUser(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Email'
        type='text'
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label='Senha'
        type='password'
        error={errors.password?.message}
        {...register('password')}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
