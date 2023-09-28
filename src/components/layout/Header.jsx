import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { signOut, getAuth } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';
import toast from 'react-hot-toast';

export default function Header() {
  const ctx = useAuth();
  console.log('ctx ===', ctx);
  const isLoggedIn = ctx.isLoggedIn;
  console.log('isLoggedIn ===', isLoggedIn);

  function logout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        toast.success('You have logged out');
      })
      .catch((error) => {
        console.log('SignOut error ===', error);
      });
  }

  const handleLogout = () => {
    logout();

    return <Navigate to='/' />;
  };

  return (
    <header className=' bg-slate-200 py-2'>
      <div className='container flex justify-between'>
        <img
          className='max-w-[15%]'
          src='https://cdn.freebiesupply.com/logos/large/2x/blackberry-logo-png-transparent.png'
          alt='BlackBerry logo'
        />

        <nav className='place-self-center'>
          {!ctx.isLoggedIn && (
            <>
              <NavLink
                to='/login'
                className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
              >
                Login
              </NavLink>

              <NavLink
                to={'/register'}
                className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
              >
                Register
              </NavLink>
            </>
          )}

          {ctx.isLoggedIn && (
            <>
              <NavLink
                to={'/shops'}
                className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
              >
                Shops
              </NavLink>

              <NavLink
                to={'/additem'}
                className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
              >
                Add Item
              </NavLink>

              <NavLink
                to='/myadds'
                className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
              >
                My Adds
              </NavLink>

              <NavLink
                onClick={handleLogout}
                to='/logout'
                className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
              >
                Logout
              </NavLink>

              <p className='inline-block text-lg px-3'>{ctx.email}</p>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
