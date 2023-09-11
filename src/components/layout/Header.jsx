// import React from "react";
// import { NavLink, Navigate } from 'react-router-dom';
// import { useAuth } from '../../store/AuthProvider';
// import { signOut } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';
// import toast from 'react-hot-toast';

// export default function Header() {
//   const ctx = useAuth();
//   const userLoggedIn = ctx.userLoggedIn;
//   console.log('isLoggedIn ===', userLoggedIn);

//   function logout() {
//     signOut(auth)
//       .then(() => {
//         toast.success('You have logged out');
//       })
//       .catch((error) => {
//         console.log('SignOut error ===', error);
//       });
//   }

//   const handleLogout = () => {
//     logout();
//     return <Navigate to='/' />;
//   };

//   return (
//     <header className='mb-4 bg-slate-200 py-2'>
//       <div className='container flex justify-between'>
//         <img
//           className='max-w-[15%]'
//           src='https://cdn.freebiesupply.com/logos/large/2x/blackberry-logo-png-transparent.png'
//           alt='BlackBerry logo'
//         />
//         <nav className='place-self-center'>
//           {!userLoggedIn && (
//             <>
//               <NavLink
//                 to={'/'}
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Home
//               </NavLink>

//               <NavLink
//                 to='/login'
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to={'/register'}
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Register
//               </NavLink>
//               <NavLink
//                 onClick={handleLogout}
//                 to='/logout'
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Logout
//               </NavLink>
//               <NavLink
//                 to={'/shops'}
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Shops
//               </NavLink>
//             </>
//           )}
//           {userLoggedIn && (
//             <>
//               <NavLink
//                 to={'/'}
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to={'/shops'}
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Shops
//               </NavLink>
//               <NavLink
//                 onClick={handleLogout}
//                 to='/logut'
//                 className=' hover:bg-slate-400 drop-shadow-lg px-3 py-4'
//               >
//                 Logout
//               </NavLink>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// import React from 'react';

import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import toast from 'react-hot-toast';

export default function Header() {
  const ctx = useAuth();

  const isLoggedIn = ctx.userLoggedIn;
  console.log('isLoggedIn ===', isLoggedIn);

  function logout() {
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
    <header className='mb-4 bg-slate-200 py-2'>
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
                onClick={handleLogout}
                to='/logout'
                className='hover:bg-slate-400 drop-shadow-lg px-3 py-4'
              >
                Logout
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
