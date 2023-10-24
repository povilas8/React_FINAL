import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { signOut, getAuth } from 'firebase/auth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
      <div className='md:hidden container'>
        <img
          className='w-44 sm:w-44 md:w-48 lg:w-56 inline-block'
          src='https://cdn.freebiesupply.com/logos/large/2x/blackberry-logo-png-transparent.png'
          alt='BlackBerry logo'
        />
        <div className='flex float-right place-items-center'>
          <GiHamburgerMenu onClick={() => setIsMobileOpen(!isMobileOpen)} />
        </div>
        <div className='justify-center items-center'>
          <nav
            className={`md:block ${
              isMobileOpen
                ? 'flex flex-col top-9 bg-slate-200 justify-center items-center'
                : 'hidden'
            }`}
          >
            {!ctx.isLoggedIn && (
              <>
                <NavLink
                  to='/shops'
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
                  to='/profile'
                  className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
                >
                  Profile
                </NavLink>
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
                  to='/shops'
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
                  to='/profile'
                  className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
                >
                  Profile
                </NavLink>

                <NavLink
                  onClick={handleLogout}
                  to='/logout'
                  className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
                >
                  Logout
                </NavLink>

                <p className='inline-block text-lg px-3'>{ctx.username}</p>
                <img
                  className='inline-block w-12 rounded-full'
                  src={
                    ctx.userAvatar ||
                    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                  }
                  alt='user avatar icon'
                />
              </>
            )}
          </nav>
        </div>
      </div>
      <div className='container flex justify-between'>
        <img
          className='hidden md:block w-44 sm:w-44 md:w-48 lg:w-56'
          src='https://cdn.freebiesupply.com/logos/large/2x/blackberry-logo-png-transparent.png'
          alt='BlackBerry logo'
        />

        {/* Full desktop menu but hidden in mobile */}
        <div className='justify-center items-center'>
          <nav className={`md:block hidden ${isMobileOpen}`}>
            {!ctx.isLoggedIn && (
              <>
                <NavLink
                  to='/shops'
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
                  to='/profile'
                  className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
                >
                  Profile
                </NavLink>
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
                  to='/shops'
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
                  to='/profile'
                  className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
                >
                  Profile
                </NavLink>

                <NavLink
                  onClick={handleLogout}
                  to='/logout'
                  className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
                >
                  Logout
                </NavLink>

                <p className='inline-block text-lg px-3'>{ctx.username}</p>
                <img
                  className='inline-block w-12 rounded-full'
                  src={
                    ctx.userAvatar ||
                    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                  }
                  alt='user avatar icon'
                />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
