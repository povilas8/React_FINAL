import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className='container'>
      <h1 className='text-2xl mb-4 pt-4'>Login with your account</h1>
      <LoginForm />
    </div>
  );
}
