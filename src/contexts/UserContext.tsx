import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface IUserProvidertProps {
  children: ReactNode;
}

interface IloginUser {
  email: string;
  password: string;
}

interface IRegisterUser {
  email: string;
  password: string;
  name: string;
}

interface IAutoLoginUser {
  email: string;
  password: string;
  name: string;
  id: number;
}

interface IUserContext {
  user: IRegisterUser | null;
  setUser: React.Dispatch<React.SetStateAction<IRegisterUser | null>>;
  registerUser: (data: IRegisterUser) => Promise<void>;
  loginUser: (data: IloginUser) => Promise<void>;
  autoLoginUser: (userId: IAutoLoginUser) => Promise<void>;
  logoutUser: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: IUserProvidertProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IRegisterUser | null>(null);

  const registerUser = async (data: IRegisterUser) => {
    try {
      const response = await api.post('/users', data);
      toast.success('Usuário cadastrado com sucesso');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cadastrar usuário');
    }
  };

  const loginUser = async (data: IloginUser) => {
    try {
      const response = await api.post('/login', data);
      setUser(response.data.user);
      const token = response.data.accessToken;
      const { id } = response.data.user;
      localStorage.setItem('@TOKEN-BURGER', token);
      localStorage.setItem('@ID-BURGER', id);
      toast.success('Login efetuado com sucesso');
      navigate('/shop');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer login');
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN-BURGER');
    localStorage.removeItem('@ID-BURGER');
    navigate('/');
  };

  const autoLoginUser = async () => {
    const token = localStorage.getItem('@TOKEN-BURGER');
    const id = localStorage.getItem('@ID-BURGER');
    if (token) {
      try {
        const response = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    autoLoginUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        autoLoginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
