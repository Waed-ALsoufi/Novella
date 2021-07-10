/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import loginStyle from '../Style/Login.module.css';
import bg from '../Images/logBg.png';
import { useAuth } from '../Components/Auth';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const history = useHistory();
  const { logIn } = useAuth();

  async function submitting() {
    try {
      await logIn(email, password);
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div className={loginStyle.contact_box}>
        <div className={loginStyle.rightLogin}>
          <span className={loginStyle.webName}>Novella</span>
          <h2 className={loginStyle.Title}>Welcome Back!</h2>
          <input
            type='text'
            className={loginStyle.field}
            placeholder='Email'
            onChange={updateEmail}
          />
          <input
            type='password'
            className={loginStyle.field}
            placeholder='Password'
            id='secondInput'
            onChange={updatePassword}
          />

          <button className={loginStyle.btn} type='button' onClick={submitting}>
            Log In
          </button>
          <h3 className={loginStyle.Title2}>
            Don't have an account?{' '}
            <Link to='/SignUp' className={loginStyle.link}>
              Sign Up
            </Link>
          </h3>
        </div>
        <div className={loginStyle.left}>
          <img src={bg} alt='' />
          <h1 id='welcome' className='text'>
            “A reader lives a thousand lives before he dies.”{' '}
          </h1>
          <h5 id='welcome' className='text'>
            -George R.R. Martin
          </h5>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
