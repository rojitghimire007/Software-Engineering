import React, { useState } from 'react';
<<<<<<< HEAD
=======
import '../style/Login.css'
>>>>>>> e6b3801 (UI pushed to alpha-ui)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.type) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  };

  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    //api call
  };

  return (
<<<<<<< HEAD
    <div style={{ padding: '5vh' }}>
      <form action="" method="post" onSubmit={loginUser}>
        Email:{' '}
=======
    <div className="login-splash" style={{ padding: '5vh' }}>
      <h1>Log-in to HGI System</h1>
      <form action="" method="post" onSubmit={loginUser} className="login-form">
>>>>>>> e6b3801 (UI pushed to alpha-ui)
        <input
          onChange={updateFields}
          value={email}
          type="email"
          name=""
<<<<<<< HEAD
          id=""
        />
        <br />
        <br />
        Pasword:{' '}
=======
          id="login-field"
          placeholder="Email"
        />
        {' '}
        <br />
        <br />
>>>>>>> e6b3801 (UI pushed to alpha-ui)
        <input
          onChange={updateFields}
          value={password}
          type="password"
          name=""
<<<<<<< HEAD
          id=""
        />
        <br />
        <br />
        <input type="submit" value="Login" />
=======
          id="login-field"
          placeholder="Username"
        />
        {' '}
        <br />
        <br />
        <input type="submit" value="Login" id="login-button"/>
>>>>>>> e6b3801 (UI pushed to alpha-ui)
      </form>
    </div>
  );
};

export default Login;
