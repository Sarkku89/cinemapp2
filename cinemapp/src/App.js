import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import RegisterUser from './RegisterUser';
import Gallery from './Gallery';
import Login from './LogIn';
import Profile from './Profile';
import { useState } from 'react';
import UserContext from './UserContext';

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
              {user && (
                <li>
                  {/* Show Profile link only when user is logged in */}
                  <Link to="/profile">Profile</Link>
                </li>
              )}

              <li>
                {user ? (
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                ) : (
                  <Link to="/login">Log In</Link>
                )}
              </li>
              <li>
                {!user && <Link to="/register">Register</Link>}
              </li>
            </ul>
          </nav>
        </header>
        <UserContext.Provider value={{user}} >
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

