import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopsPage from './pages/ShopsPage';
import { useAuth } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';
import SingleItemPage from './pages/SingleItemPage';
import ProfilePage from './pages/ProfilePage';
import MyAddsPage from './pages/MyAddsPage';
import { useEffect, useState } from 'react';
import CreateItemPage from './pages/CreateItemPage';

export default function App() {
  const ctx = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Ši funkcija bus iškviesta po tam tikro laiko (pvz., po 2 sekundžių)
  const finishLoading = () => {
    setIsLoading(false); // Nustatomas isLoading į false, tai leis rodyti turinį
  };

  useEffect(() => {
    // Čia nustatome, kiek laiko lauksime, prieš atnaujinant langą
    const delay = 1000; // 2000 milisekundžių = 2 sekundės

    // Nustatome, kad funkcija finishLoading bus iškviesta po delay laiko
    const timeoutId = setTimeout(finishLoading, delay);

    // Komponento išgaunama išmontavimo metu išvalome timeout
    return () => clearTimeout(timeoutId);
  }, []);

  // Čia turinys, kuris bus rodomas, kai isLoading yra false (po 2 sekundžių)
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Toaster />
          <Header />
          <Routes>
            <Route path='/' element={<ShopsPage />} />
            <Route path='/shops' element={<ShopsPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/:itemId' element={<SingleItemPage />} />

            <Route
              path='/additem'
              element={
                ctx.isLoggedIn ? <CreateItemPage /> : <Navigate to={'/login'} />
              }
            />
            <Route
              path='/myadds'
              element={
                ctx.isLoggedIn ? <MyAddsPage /> : <Navigate to={'/login'} />
              }
            />
            <Route
              path='/profile'
              element={
                ctx.isLoggedIn ? <ProfilePage /> : <Navigate to={'/login'} />
              }
            />
            <Route path='/logout' element={<ShopsPage />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}
