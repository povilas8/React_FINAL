import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

export default function RegistrationForm() {
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      age: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .matches(
          /^([a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9._%-]+@[a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9.-]+\.[a-zA-Z]{2,})$/,
          'Patikrinkite Emaila'
        )
        .min(3, 'Minimum 3 simboliai')
        .required('Privalomas laukas')
        .oneOf(
          [
            'george.bluth@reqres.in',
            'janet.weaver@reqres.in',
            'emma.wong@reqres.in',
            'eve.holt@reqres.in',
          ],
          'email doesnt match'
        ),
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
    onSubmit: (values) => {
      console.log('paskyra užregistruota, duomenys:', values);
      handleRegister(values);
    },
  });

  function handleRegister(userCredentialsObj) {
    console.log('userCredentialsObj ===', userCredentialsObj);
    axios
      .post('https://reqres.in/api/register', userCredentialsObj)
      .then((ats) => {
        console.log('ats ===', ats);
        console.log('ats.data.token ===', ats.data.token);
        if (ats.data.token) {
          console.log('Registracija sėkminga');
          setRegisterSuccess(true);
        }
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
        formik.setErrors({ email: 'Email or password not found' });
      });
  }

  return (
    <container>
      <h2>Register new account</h2>

      {registerSuccess && (
        <div>
          <h2>Your account is now registered!</h2>
        </div>
      )}
      {!registerSuccess && (
        <form onSubmit={formik.handleSubmit}>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='text'
            placeholder='Email'
            id='email'
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            placeholder='Password'
            id='password'
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            type='password'
            placeholder='Repeat password'
            id='repeatPassword'
          />
          {formik.errors.repeatPassword && formik.touched.repeatPassword && (
            <p>{formik.errors.repeatPassword}</p>
          )}
          <button type='submit'>Register</button>
        </form>
      )}
    </container>
  );
}
