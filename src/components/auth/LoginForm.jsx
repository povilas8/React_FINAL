import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';

export default function LoginForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: 'povilas@feu8.com',
      password: 'feu999',
      username: 'povilas',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(4).max(255).required(),
    }),
    onSubmit: (values) => {
      console.log('supildytos reiksmes ===', values);
      loginWithFire(values.email, values.password);
    },
  });
  function loginWithFire(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Login successfully');
        // Signed in
        const user = userCredential.user;
        const username = user.displayName;

        console.log('username ===', username);
        console.log('user login ok ===', user);
        setTimeout(() => {
          navigate('/shops', { replace: true });
        }, 2000);
      })
      .catch((error) => {
        toast.error('Login failed, check email or password');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ errorCode, errorMessage });
      });
  }

  return (
    <div className='container text-center mt-5'>
      <h1 className='place-self-center text-2xl mb-4 pt-4'>
        Login with your account
      </h1>
      <div className='mx-auto mb-20 border border-slate-500 p-8 shadow-md rounded-sm w-96'>
        <Toaster />
        <form onSubmit={formik.handleSubmit} className='max-w-xs'>
          <div className='mb-2'>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className='border border-slate-500 px-4 py-2 w-full rounded-md'
              type='text'
              id='email'
              placeholder='Email'
            />
            {formik.errors.email && formik.touched.email && (
              <p className='text-md text-red-500 '>{formik.errors.email}</p>
            )}
          </div>
          <div className='mb-2'>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className='border border-slate-500 px-4 py-2 w-full rounded-md'
              type='password'
              id='password'
              placeholder='Password'
            />
            {formik.errors.password && formik.touched.password && (
              <p className='text-md text-red-500 '>{formik.errors.password}</p>
            )}
          </div>
          <button
            className='bg-slate-300 hover:bg-slate-400 drop-shadow-md px-4 py-2 rounded-md'
            type='submit'
          >
            Login
          </button>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
}
