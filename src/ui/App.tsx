import { useEffect, useState } from 'react';
import { trpcClient } from './trpc';

function App() {
  const [count, setCount] = useState(1);
  const [double, setDouble] = useState(0);

  useEffect(() => {
    trpcClient.double.query({ value: count }).then((res) => {
      setDouble(res.double);
    });

    trpcClient.test.mutate().then(console.log);
  }, [count]);

  return (
    <center>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      <div>{double}</div>
    </center>
  );
}

export default App;
