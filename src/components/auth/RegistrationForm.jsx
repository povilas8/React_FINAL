import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
        .min(3, 'Minimum 3 simboliai')
        .required('Privalomas laukas'),

      password: Yup.string()
        .trim()
        .min(4, 'Minimum 4 simboliai')
        .max(8)
        .required('Privalomas laukas'),

      repeatPassword: Yup.string()
        .trim()
        .min(4, 'Minimum 4 simboliai')
        .max(8)
        .required('Privalomas laukas')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match!'),
    }),
    onSubmit: async (values) => {
      console.log('paskyra užregistruota, duomenys:', values);
      try {
        const { email, password } = values;
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('userCredential ===', userCredential);
        toast.success('Your account is now registered!' + email);

        navigate('/shops', { replace: true });
      } catch (error) {
        toast.error('Registration failed, please try again');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ errorCode, errorMessage });
      }
    },
  });

  return (
    <div className='mb-20 border border-slate-500 p-8 shadow-md rounded-sm'>
      <h2>Register new account</h2>
      <Toaster />
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
