import React from 'react';
import PropTypes from 'prop-types';
import styles from './login.module.css';

const Login = () => (
  <div className={styles.contentWrapper}>
  <div className={styles.container}>
    <forms>
      <h1>Login</h1>
      <input type="UserId" placeholder="Enter the registered UserId"/>
      <input type="Password" placeholder="Enter the password" />
      
      <button><a href="./feed">Login</a></button>
      <div className={styles.__container}>
        <a href="./forgot_pwd">Forgot Password?</a>
        <hr/>
        <a href="./signup">Don't have an account? Signup</a>
      </div>
    </forms>
  </div>
</div>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
