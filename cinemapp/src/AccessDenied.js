import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div>
      <h2 id="h2-profile">Access Denied</h2>
      <p>Sorry, you don't have the rights to access this page.</p>
      <p>
        <Link to="/">Return to front page</Link>
      </p>
    </div>
  );
};

export default AccessDenied;