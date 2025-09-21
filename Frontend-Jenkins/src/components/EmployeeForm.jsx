import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import config from './config';

const API_URL = `${config.url}/employeeapi/`;

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        id: '',
        name: '',
        gender: '',
        department: '',
        email: '',
        contact: ''
    });

    useEffect(() => {
        if (id) {
            fetchEmployee();
        }
    }, [id]);

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`${API_URL}get/${id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`${API_URL}update`, employee);
            } else {
                await axios.post(`${API_URL}add`, employee);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{id ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                {!id && (
                    <div className="mb-3">
                        <label className="form-label">ID</label>
                        <input type="number" name="id" value={employee.id} onChange={handleChange} className="form-control" required />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" value={employee.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select name="gender" value={employee.gender} onChange={handleChange} className="form-control" required>
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input type="text" name="department" value={employee.department} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={employee.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input type="text" name="contact" value={employee.contact} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-success me-2">{id ? 'Update' : 'Add'}</button>
                <button onClick={() => navigate('/')} className="btn btn-secondary">Cancel</button>
            </form>
        </div>
    );
};

export default EmployeeForm;