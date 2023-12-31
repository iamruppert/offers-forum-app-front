import React from 'react';
import { useNavigate } from 'react-router-dom';

import {FaKey, FaUserPlus, FaUserShield} from "react-icons/fa";
import RegisterRecruiterForm from "./RegisterRecruiterForm";
import RegisterAdminForm from "./RegisterAdminForm";

const Settings = () => {
    const navigate = useNavigate();

    function handleRecruiterClick() {
        navigate('/settings/registerRecruiter');
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4"
                style={{borderBottom: '2px solid #000', fontStyle: 'italic', fontSize: '28px'}}>
                <span style={{verticalAlign: 'middle'}}>Settings</span>
            </h2>
            <div className="text-center">
                <ul className="list-group">

                    <RegisterRecruiterForm/>
                    <RegisterAdminForm/>
                    {/*<li className="list-group-item" style={{fontSize: '40px'}}>*/}
                    {/*    <FaUserShield style={{marginRight: '10px'}}/>*/}
                    {/*    Add admin*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>
    );
};

export default Settings;
