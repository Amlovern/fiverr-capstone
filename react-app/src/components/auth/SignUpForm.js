import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(sessionActions.signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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

  const loginRedirect = (e) => {
    e.preventDefault();
    return history.push('/login')
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-up-page'>
      <form onSubmit={onSignUp} className='sign-up-form'>
      <section className='form-header'>Join Nerdrr</section>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div className='input-wrapper'>
          <label>Username</label>
          <input
            className='sign-up-input'
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            ></input>
        </div>
        <div className='input-wrapper'>
          <label>Email</label>
          <input
            className='sign-up-input'
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
            ></input>
        </div>
        <div className='input-wrapper'>
          <label>Password</label>
          <input
            className='sign-up-input'
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
            ></input>
        </div>
        <div className='input-wrapper'>
          <label>Confirm Password</label>
          <input
            className='sign-up-input'
            type='password'
            name='confirm_password'
            placeholder='Confirm Password'
            onChange={updateConfirmPassword}
            value={confirmPassword}
            required={true}
            ></input>
        </div>
        <div className='sign-up-btn-container'>
          <button className='sign-up-btn' type='submit'>Join</button>
          <button
            className='sign-up-btn'
            type='button'
            onClick={demoLogin}
            >
            Demo Log In
          </button>
        </div>
      </form>
      <div className='sign-up-footer'>
          <p>Already a member?</p>
          <button 
          className='sign-up-login-redirect'
          onClick={loginRedirect}
          >
          Sign in
          </button>
        </div>
    </div>
  );
};

export default SignUpForm;
