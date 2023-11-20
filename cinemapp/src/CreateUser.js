//import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, createUser } from './api/axios';

function CreateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    /*function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { name, email, password })
            .then(res => {
                console.log(res)
                navigate('/');
            }).catch(err => console.log(err));
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { name, email, password })
            .then(res => {
                console.log(res)
                navigate('/');
            }).catch(err => console.log(err));
    }*/

    const handleSubmit = async (event) => {       
        try {
            event.preventDefault();
            const newUser = {
                "name": name, 
                "email": email,
                "password": password
            }//{ name: name, email: email, password: password };
            await createUser(newUser);
            // Fetch updated user list after creation
            const response = await getAllUsers();
            setUsers(response.data);
            navigate('/')
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Register new user</h2>

                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter name" className="from-control"
                            onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter email" className="form-control"
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Enter email" className="form-control"
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default CreateUser