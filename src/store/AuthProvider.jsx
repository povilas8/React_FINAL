import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({
  email: '',
  isLoggedIn: '',
  userUid: '',
  displayName: '',
  avatar: '',
});

AuthContext.displayName = 'Auth';

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState({});

  const email = fireUser.email;
  const userUid = fireUser.uid;
  const displayName = fireUser.displayName;
  const avatar = fireUser.photoURL;
  let isLoggedIn = !!email;
  isLoggedIn = email ? true : false;

  console.log('email ===', email);

  const ctx = {
    email: email,
    isLoggedIn: isLoggedIn,
    userUid: userUid,
    username: displayName,
    userAvatar: avatar,
  };

  console.log('username ===', ctx.username);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        // ...
        console.log('Login success');
        setFireUser(user);
      } else {
        // User is signed out
        // ...
        console.log('Logout');
        setFireUser({});
      }
    });
  }, []);

  return (
    // eslint-disable-next-line react/prop-types
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
