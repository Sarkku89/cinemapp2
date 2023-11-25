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
import CreateAuditorium from './CreateAuditorium';
import { useState } from 'react';
import UserContext from './UserContext';
import AccessDenied from './AccessDenied';
import PleaseLogin from './PleaseLogin';
import ManageUsers from './ManageUsers';
import ManageScreenings from './ManageScreenings';
import EditScreenings from './EditScreenings';
import EditScreeningForm from './EditScreeningForm';
import AdminScreenings from './AdminScreenings';
import AdminAuditoriums from './AdminAuditoriums';
import AdminMovies from './AdminMovies';

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
                    <Link to="/profile">Profile</Link>
                  </li>
                  {user.admin && (
                    <>
                    {/* Only for admnins */}
                      <li>
                        
                        <Link className='admin-link' to="/admin-movies">Movies</Link>
                      </li>
                      <li>
                        <Link className='admin-link' to="/admin-screenings">Screenings</Link>
                      </li>
                      <li>
                        <Link className='admin-link' to="/admin-auditoriums">Auditoriums</Link>
                      </li>
                      <li>
                        <Link className='admin-link' to="/manage-users">Manage Users</Link>
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
            <Route path="/create-auditorium" element={<CreateAuditorium />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/please-login" element={<PleaseLogin />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-screenings" element={<ManageScreenings />} />
            <Route path="/admin-screenings" element={<AdminScreenings />} />
            <Route path="/admin-movies" element={<AdminMovies />} />
            <Route path="/admin-auditoriums" element={<AdminAuditoriums />} />
            <Route path="/manage-screenings/edit/:movieId" element={<EditScreenings />} />
            <Route path="/manage-screenings/edit/:movieId/screening/:screeningId" element={<EditScreeningForm />} />

          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;