import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .min(3, 'At least 4 symbols is required')
        .required('Email is required'),

      password: Yup.string()
        .trim()
        .min(6, 'At least 6 symbols is required')
        .required('Password is required'),

      repeatPassword: Yup.string()
        .trim()
        .min(6, 'At least 6 symbols is required')
        .required('Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match!'),
    }),
    onSubmit: async (values) => {
      console.log('paskyra užregistruota, duomenys:', values);
      try {
        const { email, password } = values;
        const auth = getAuth();
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        if (signInMethods.length === 0) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          console.log('userCredential ===', userCredential);
          toast.success('Your account is now registered! ' + email);
          setTimeout(() => {
            navigate('/shops', { replace: true });
          }, 2000);
        } else {
          toast.error('An account with this email address already exists.');
        }
      } catch (error) {
        toast.error('Registration failed, please try again');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ errorCode, errorMessage });
      }
    },
  });

  return (
    <div className='mx-auto mb-20 border border-slate-500 p-8 shadow-md rounded-sm w-96'>
      <Toaster />
      <h2>Register new account</h2>
      <form onSubmit={formik.handleSubmit} className='max-w-xs'>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className='mb-2 border border-slate-500 px-4 py-2 w-full rounded-md'
          type='text'
          placeholder='Email'
          id='email'
        />
        {formik.errors.email && formik.touched.email && (
          <p className='text-md text-red-500'>{formik.errors.email}</p>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className='mb-2 border border-slate-500 px-4 py-2 w-full rounded-md'
          type='password'
          placeholder='Password'
          id='password'
        />
        {formik.errors.password && formik.touched.password && (
          <p className='text-md text-red-500 '>{formik.errors.password}</p>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
          className='mb-2 border border-slate-500 px-4 py-2 w-full rounded-md'
          type='password'
          placeholder='Repeat password'
          id='repeatPassword'
        />
        {formik.errors.repeatPassword && formik.touched.repeatPassword && (
          <p className='text-md text-red-500 '>
            {formik.errors.repeatPassword}
          </p>
        )}
        <button
          className='bg-slate-300 hover:bg-slate-400 drop-shadow-md px-4 py-2 rounded-md'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  );
}
