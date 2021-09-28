import api from 'api';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setLocalStorage } from 'utils/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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

    api
      .login(email, password)
      .then((res) => {
        setLocalStorage('pipeline_token', res.token);
        history.push('/');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ padding: '5vh' }}>
      <form action="" method="post" onSubmit={loginUser}>
        Email:{' '}
        <input
          onChange={updateFields}
          value={email}
          type="email"
          name=""
          id=""
        />
        <br />
        <br />
        Pasword:{' '}
        <input
          onChange={updateFields}
          value={password}
          type="password"
          name=""
          id=""
        />
        <br />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
