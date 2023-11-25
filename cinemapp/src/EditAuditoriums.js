import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import axios from 'axios';

const EditAuditoriums = () => {
    const [auditoriums, setAuditoriums] = useState([]);
    const [selectedAuditorium, setSelectedAuditorium] = useState(null);
    const navigate = useNavigate();
    const user = useUserContext();
    const [auditoriumName, setAuditoriumName] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectedAudEdit, setSelectedAudEdit] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        size: '',
    });

    useEffect(() => {
        if (!user || !user.user || !user.user.admin) {
            navigate('/access-denied');
        }
    }, [navigate, user]);

    useEffect(() => {
        // Fetch the list of auditoriums when the component mounts
        fetchAuditoriums();
    }, []);

    const fetchAuditoriums = async () => {
        try {
            const response = await fetch('http://localhost:8080/auditoriums');
            const data = await response.json();
            setAuditoriums(data);
        } catch (error) {
            console.error('Error fetching auditoriums:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditAuditorium = () => {
        setSuccess(false);
        if (selectedAuditorium) {
            setAuditoriumName(selectedAuditorium.name);
            setSelectedAudEdit(true);
            setFormData({
                name: selectedAuditorium.name,
                size: selectedAuditorium.size,

            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8080/auditoriums/${selectedAuditorium.id}`, {
                name: formData.name,
                size: formData.size
            });
            setSelectedAuditorium(formData);
            setAuditoriumName(formData.name);
            setSuccess(true);
            fetchAuditoriums();
        } catch (error) {
            console.error('Error updating auditorium:', error);
        }
    };
    const handleDeleteAuditorium = async (audId) => {
        if (deleteConfirmation) {
            try {
                await axios.delete(`http://localhost:8080/auditoriums/${audId}`);
                fetchAuditoriums();
                setDeleteConfirmation(false);
            } catch (error) {
                console.error('Error deleting screening:', error);
            }
        } else {
            setDeleteConfirmation(true);
        }
    };

    return (
        <div>
            <h2 id="h2-profile">Manage Auditoriums</h2>
            <label>Select Auditorium:</label><br /><br />
            <div style={{ display: "flex" }} className='edit-form-container'>
                <select
                    onChange={(e) => setSelectedAuditorium(JSON.parse(e.target.value))}
                    value={selectedAuditorium ? JSON.stringify(selectedAuditorium) : ''}
                >
                    <option value="">Select an auditorium</option>
                    {auditoriums.map((aud) => (
                        <option key={aud.id} value={JSON.stringify(aud)}>
                            {aud.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleEditAuditorium}>Edit</button>
                {deleteConfirmation ? (
                    <>
                        <button onClick={() => handleDeleteAuditorium(selectedAuditorium.id)} style={{ backgroundColor: '#ff7400', color: "white" }}>
                            Confirm Delete?
                        </button>
                        <button onClick={() => setDeleteConfirmation(false)}>Cancel Delete</button>
                    </>
                ) : (
                    <button onClick={() => handleDeleteAuditorium(selectedAuditorium.id)} id="delete-btn">Delete</button>
                )}
            </div>
            <div>
                <br /><br />
                <h2 id="h2-profile">Auditorium Details:</h2>

                {selectedAuditorium ? (
                    <table className='users-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Number of seats</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedAuditorium.name}</td>
                                <td>{selectedAuditorium.size}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No auditorium selected</p>
                )}
            </div>
            {selectedAudEdit && (
                <div>
                    <br />
                    <br />
                    <h2 id="h2-profile">Edit {auditoriumName} </h2>
                    {success ? (
                        <div>
                            <p>{auditoriumName} updated successfully!</p><br />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='name'>Name</label>
                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <label htmlFor='size'>Number of seats</label>
                            <input
                                id="size"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                            />

                            <button id="save-btn" type="submit">Save</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditAuditoriums;
