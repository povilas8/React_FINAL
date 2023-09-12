import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className='container text-center mt-5'>
      <h1 className='place-self-center text-2xl mb-4 pt-4'>
        Login with your account
      </h1>
      <LoginForm />
    </div>
  );
}
