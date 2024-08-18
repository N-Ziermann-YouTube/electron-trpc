import { useSubscribe } from './hooks/useSubscribe';

function App() {
  const currentValue = useSubscribe(window.electron.subscribeExample);

  if (!currentValue) {
    return;
  }

  return (
    <center>
      <h3>{currentValue.message}</h3>
      <button
        onClick={async () =>
          alert((await window.electron.getExample()).message)
        }
      >
        Click me
      </button>
    </center>
  );
}

export default App;
