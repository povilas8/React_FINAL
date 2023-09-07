import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ShopsPage from '../../pages/ShopsPage';

export default function Header() {
  return (
    <header className='container flex justify-between items-center '>
      <HomePage />
      <LoginPage />
      <RegisterPage />
      <ShopsPage />
    </header>
  );
}
