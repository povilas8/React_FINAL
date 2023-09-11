/* eslint-disable no-unused-vars */
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '../../firebase/firebase';

export default function GoogleLogin() {
  function authWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log('token ===', token);

        const user = result.user;

        console.log('user ===', user);
      })
      .catch((error) => {
        console.warn('error ===', error);

        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('credential ===', credential);
      });
  }

  return (
    <>
      <h3 className='pt-10'>Use Google Login for quick access</h3>
      <button className='' onClick={authWithGoogle}>
        <FcGoogle size={35} />
      </button>
    </>
  );
}
