import './auth.css';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const LoginForm = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
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

  const registerRedirect = (e) => {
    e.preventDefault()
    return history.push('/sign-up')
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <form onSubmit={onLogin} autoComplete='off' className='login-form'>
        <section className='form-header'>Sign In to Nerdrr</section>
        <div className='resource-error-container'>
          {errors.map((error, idx) => (
            <p className='resource-error-message' key={idx}>
              {error?.split(': ')[1]}
            </p>  
          ))}
        </div>
        <div className='input-wrapper'>
          <label htmlFor='credential'>Email / Username</label>
          <span className='label-required'>* Required</span>
          <input
            className='login-input'
            name='credential'
            type='text'
            placeholder='Email / Username'
            value={credential}
            onChange={updateCredential}
            />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='password'>Password</label>
          <span className='label-required'>* Required</span>
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            />
        </div>
        <div className='login-btn-container'>
          <button className='login-btn' type='submit'>Login</button>
          <button
            className='login-btn'
            type='button'
            onClick={demoLogin}
            >
            Demo Log In
          </button>
        </div>
      </form>
        <div className='login-footer'>
          <p>Not a member yet?</p>
          <button 
          className='login-register-redirect'
          onClick={registerRedirect}
          >
          Join now
          </button>
        </div>
    </div>
  );
};

export default LoginForm;
