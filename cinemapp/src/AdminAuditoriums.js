import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const AdminAuditoriums = () => {
    const user = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.user || !user.user.admin) {
            navigate('/access-denied');
        }
    }, [navigate, user]);
    return (
        <div>
            <h2 id="h2-profile">Auditoriums Management</h2>
                <Link to="/create-auditorium">Add auditoriums</Link><br />
                <Link to="/manage-auditoriums">Manage auditoriums</Link>
        </div>
    );
};


export default AdminAuditoriums;
