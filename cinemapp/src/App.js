import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import RegisterUser from './RegisterUser';
import Gallery from './Gallery';
import Login from './LogIn';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <div className="logo">
            <img src="cinemapp_logo.png" alt="App Logo" />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/screenings">Screenings</Link>
              </li>
              {user ? (
                // Show My tickets link when user is logged in
                <li>
                  <Link to="/mytickets">
                    My tickets
                  </Link>
                </li>
              ) : (
                <li></li>
              )}

              <li>
                {user ? (
                  // Show logout link when user is logged in
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                ) : (
                  // Show login link when user is not logged in
                  <Link to="/login">Log In</Link>
                )}
              </li>
              <li>
                {/* Show register link when user is not logged in */}
                {!user && <Link to="/register">Register</Link>}
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

