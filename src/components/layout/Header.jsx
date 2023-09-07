import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ShopsPage from '../../pages/ShopsPage';

export default function Header() {
  return (
    <div className='bg-slate-200'>
      <header className='container flex mt-2'>
        <HomePage />
        <ShopsPage />
        <LoginPage />
        <RegisterPage />
      </header>
    </div>
  );
}
