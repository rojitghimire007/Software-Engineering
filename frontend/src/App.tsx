import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Poc from './components/Poc';

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

function App() {
  const [ready, setReady] = useState(false); // set to false

  /**
   * Auth Call
   */
  useEffect(() => {
    setReady(true);
  }, []);

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse">Loading</div>
    </div>
  );

  return (
    <React.Suspense fallback={loading}>
      <>{ready && <TheLayout />}</>
    </React.Suspense>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
