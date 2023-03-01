import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './pages/LoginPage';
import { ProtectedRoutesPage } from './pages/ProtectedRoutesPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';

const Router = () => (
  <Routes>
    <Route
      path='/'
      element={
        <UserProvider>
          <LoginPage />
        </UserProvider>
      }
    />
    <Route
      path='/register'
      element={
        <UserProvider>
          <RegisterPage />
        </UserProvider>
      }
    />
    <Route
      path='/shop'
      element={
        <UserProvider>
          <CartProvider>
            <ProtectedRoutesPage />
          </CartProvider>
        </UserProvider>
      }
    >
      <Route index element={<ShopPage />} />
    </Route>
  </Routes>
);

export default Router;
