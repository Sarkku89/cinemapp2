import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const AdminScreenings = () => {
    const user = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.user || !user.user.admin) {
            navigate('/access-denied');
        }
    }, [navigate, user]);
    return (
        <div>
            <h2 id="h2-profile">Screenings Management</h2>

                    <Link to="/create-screening">Add screenings</Link><br />
                    <Link to="/manage-screenings">Manage screenings</Link>
        </div>
    );
};


export default AdminScreenings;
