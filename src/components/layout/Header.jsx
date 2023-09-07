import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='mb-4 bg-slate-200 py-2'>
      <div className='container flex justify-between'>
        <img
          className='max-w-[15%]'
          src='https://cdn.freebiesupply.com/logos/large/2x/blackberry-logo-png-transparent.png'
          alt='BlackBerry logo'
        />
        <nav className='place-self-center'>
          <NavLink
            to='/'
            className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
          >
            Home
          </NavLink>
          <NavLink
            to='/shops'
            className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
          >
            Shops
          </NavLink>
          <NavLink
            to='/register'
            className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
          >
            Register
          </NavLink>
          <NavLink
            to='/login'
            className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
          >
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
