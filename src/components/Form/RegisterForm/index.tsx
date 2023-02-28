import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useUserContext } from '../../../hooks/useUserContext';

interface IFormRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    name: yup.string(),
    email: yup
      .string()
      .email('E-mail deve ser um e-mail válido')
      .required('E-mail é um campo obrigatório'),
    password: yup.string().required('Senha é um campo obrigatório'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password')],
        'Confirmação de senha deve ser igual a senha'
      )
      .required('Confirmacão de senha é um campo obrigatório'),
  })
  .required();

const RegisterForm = () => {
  const { registerUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegister>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IFormRegister> = (data) => {
    registerUser(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input label='Nome' {...register('name')} error={errors.name?.message} />
      <Input
        label='Email'
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label='Senha'
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        label='Confirmar senha'
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
