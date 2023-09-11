import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({
  user: '',
  isLoggedIn: '',
  userUid: '',
});

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFireUser(user);
      } else {
        setFireUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ctx = {
    user: fireUser,
    isLoggedIn: !!fireUser,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
