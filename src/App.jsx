import { useState } from 'react';
import Header from './components/layout/Header';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
    </div>
  );
}
