import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { setLocalStorage } from 'utils/utils';
//import Footer from 'views/Footer';


// Fonts
import '@fontsource/fenix';
import '@fontsource/roboto';
import '@fontsource/bebas-neue';
import '@fontsource/teko';
import '@fontsource/alfa-slab-one';

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

function App() {
  const [ready, setReady] = useState(false); // set to false

  const history = useHistory();

  useEffect(() => {
    // Auth Call
    // Send to login page if token exppired. If a valiud token exists, avoid login page
    api
      .auth()
      .then((res) => {
        if (window.location.pathname === '/login' && res.success) {
          // history.push('/');
        } else if (!res.success) {
          // logoutAndRedirect();
          setLocalStorage('pipeline_token', '');
          history.push('/login');
        }
        setReady(true);
      })
      .catch((err) => {
        // logoutAndRedirect();
        history.push('/login');
        setReady(true);
      });
  }, []);

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse">Loading</div>
    </div>
  );

  return (
    <>
      <React.Suspense fallback={loading}>
        <>{ready && <TheLayout />}</>
      </React.Suspense>
    </>
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
