import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import AdminOffers from './AdminOffers';
import './AdminDashboard.css';
import {jwtDecode} from "jwt-decode";
import OfferViewAdminRecruiter from "../offer/OfferViewAdminRecruiter"; // Dodaj import pliku ze stylami

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    const handleUsers = () => {
        navigate('/users');
    };

    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Pobierz token z localStorage
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // Odczytaj e-mail z tokena i zaktualizuj stan
                const decodedToken = jwtDecode(token);
                const userEmail = decodedToken.sub;
                setUserEmail(userEmail);
            } catch (error) {
                console.error('Error decoding token', error);
            }
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="text-center flex-grow-1">
                    <h2 className="mx-auto">NoFluffCareers</h2>
                </div>

                <div className="d-flex gap-2 align-items-center">
                    <div className="d-flex flex-column align-items-start">
                        <p><strong>Logged in as:</strong> {userEmail}</p>
                        <div className="d-flex gap-2">
                            <Link to="/settings" className="link">
                                <span className="icon-text">
                                    <FaCog style={{ fontSize: '24px' }} />
                                    Settings
                                </span>
                            </Link>
                            <span onClick={handleLogout} className="link logout">
                                <span className="icon-text">
                                    <FaSignOutAlt style={{ fontSize: '24px' }} />
                                    Logout
                                </span>
                            </span>
                            <Link to="/users" className="link">
                                <span className="icon-text">
                                    <FaUsers style={{ fontSize: '24px' }} />
                                    Users
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <OfferViewAdminRecruiter />
        </div>
    );
};

export default AdminDashboard;
