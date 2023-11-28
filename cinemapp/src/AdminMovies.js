import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const AdminMovies = () => {
    const user = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.user || !user.user.admin) {
            navigate('/access-denied');
        }
    }, [navigate, user]);
    return (
        <div>
            <h2 id="h2-profile">Movies Management</h2>

                    <Link to="/create-movie">Add movies</Link><br />
                    <Link to="/manage-movies">Manage movies</Link>

        </div>
    );
};


export default AdminMovies;
