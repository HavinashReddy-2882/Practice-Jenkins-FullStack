import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import config from './config';

const API_URL = `${config.url}/employeeapi/`;

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // The previous code had a different URL. This is updated to match the new API URL.
                const response = await axios.get(`${API_URL}get/${id}`);
                setEmployee(response.data);
                setLoading(false);
            } catch (err) {
                setError("Employee not found or an error occurred.");
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5 text-danger">{error}</div>;
    }

    if (!employee) {
        return <div className="container mt-5">No employee data available.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Employee Details</h2>
                </div>
                <div className="card-body">
                    <p><strong>First Name:</strong> {employee.name}</p>
                    <p><strong>Last Name:</strong> {employee.gender}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                </div>
                <div className="card-footer">
                    <Link to="/" className="btn btn-secondary me-2">Back to List</Link>
                    <Link to={`/edit/${employee.id}`} className="btn btn-warning">Edit</Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;