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
        <Route path='/shops' element={<ShopsPage />} />
        <Route path='/shopitems/:itemId' element={<SingleItemPage />} />
        <Route path='/additem' element={<CreateItem />} />
        <Route
          path='/additem'
          element={ctx.isLoggedIn ? <CreateItem /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/shopitems/:itemId'
          element={ctx.isLoggedIn ? <ShopsPage /> : <Navigate to={'/login'} />}
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
