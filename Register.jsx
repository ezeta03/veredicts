import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [userInfo, setUserInfo] = useState(null);

    const handleRegister = async (userData) => {
        const response = await axios.post('http://localhost:5000/register', userData);
        setUserInfo(response.data); // Guardar la información del usuario
    };

    return (
        <div>
            <button onClick={() => handleRegister({ name: 'John', email: 'john@example.com' })}>
                Register
            </button>
            {userInfo && (
                <label>
                    Usuario Registrado: {userInfo.name} - {userInfo.email}
                </label>
            )}
        </div>
    );
};

export default Register;