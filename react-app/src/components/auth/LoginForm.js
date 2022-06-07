import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const LoginForm = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = await dispatch(sessionActions.login({ credential, password }));
    if (data) {
      setErrors(data);
    }
  };

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(
        sessionActions.login({
          credential: 'Voltoro',
          password: 'Num14Eva'
        })
      );

      if (data) setErrors(data)
    } catch (errorResponse) {
      console.log(errorResponse)
    }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} autoComplete='off'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='credential'>Email / Username</label>
        <input
          name='credential'
          type='text'
          placeholder='Email / Username'
          value={credential}
          onChange={updateCredential}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
      </div>
      <div>
        <button
          type='button'
          onClick={demoLogin}
        >
          Demo Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
