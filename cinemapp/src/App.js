import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UpdateUser from './UpdateUser';
import RegisterUser from './RegisterUser';
import Gallery from './Gallery';
import Login from './LogIn';
import Profile from './Profile';
import CreateMovie from './CreateMovie';
import CreateScreening from './CreateScreening';
import { useState } from 'react';
import UserContext from './UserContext';
import AccessDenied from './AccessDenied';
import PleaseLogin from './PleaseLogin';
import ManageUsers from './ManageUsers';

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
                <>
                  <li>
                    {/* Show Profile link only when the user is logged in */}
                    <Link to="/profile">Profile</Link>
                  </li>
                  {user.admin && (
                    <>
                      <li>
                        {/* Show "Add movies" link only if the user is an admin */}
                        <Link to="/create-movie">Add movies</Link>
                      </li>
                      <li>
                        {/* Show "Add screenings" link only if the user is an admin */}
                        <Link to="/create-screening">Add screenings</Link>
                      </li>
                      <li>
                        {/* Show "Manage Users" link only if the user is an admin */}
                        <Link to="/manage-users">Manage Users</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}
              <li>{!user && <Link to="/register">Register</Link>}</li>
            </ul>
          </nav>
        </header>
        <UserContext.Provider value={{ user }}>
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/updateuser" element={<UpdateUser />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/create-movie" element={<CreateMovie />} />
            <Route path="/create-screening" element={<CreateScreening />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/please-login" element={<PleaseLogin />} />
            <Route path="/manage-users" element={<ManageUsers />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;