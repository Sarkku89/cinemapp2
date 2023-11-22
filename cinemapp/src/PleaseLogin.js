import React from 'react';
import { Link } from 'react-router-dom';

const PleaseLogin = () => {
  return (
    <div>
      <h2 id="h2-profile">Please login or register</h2>
      <p>Sorry, you can only access this content when logged in.</p>
      <p>
        <Link to="/login">Log in</Link><br />
        <Link to="/register">Register</Link><br/><br />
        <Link to="/"> Return to home page</Link>
        
      </p>
    </div>
  );
};

export default PleaseLogin;
