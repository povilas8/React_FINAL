import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopsPage from './pages/ShopsPage';
import { useAuth } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';
import CreateItem from './pages/CreateItem';
import SingleItemPage from './pages/SingleItemPage';
import ProfilePage from './pages/ProfilePage';
import MyAddsPage from './pages/MyAddsPage';

export default function App() {
  const ctx = useAuth();

  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/additem'
          element={ctx.isLoggedIn ? <CreateItem /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/myadds'
          element={ctx.isLoggedIn ? <MyAddsPage /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/:itemId'
          element={
            ctx.isLoggedIn ? <SingleItemPage /> : <Navigate to={'/login'} />
          }
        />
        <Route
          path='/shops'
          element={ctx.isLoggedIn ? <ShopsPage /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/profile'
          element={
            ctx.isLoggedIn ? <ProfilePage /> : <Navigate to={'/login'} />
          }
        />
        <Route
          path='/single'
          element={
            ctx.isLoggedIn ? <SingleItemPage /> : <Navigate to={'/login'} />
          }
        />
        <Route path='/logout' element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
