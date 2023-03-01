import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

export const ProtectedRoutesPage = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  return user ? <Outlet /> : null;
};
