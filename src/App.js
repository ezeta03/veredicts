import React, { useState } from 'react';
import axios from 'axios';



const App = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const userData = { name, email };
        try {
            const response = await axios.post('http://localhost:5000/register', userData);
            setUserInfo(response.data); // Guardar la información del usuario
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };

    return (
        <div>
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Registrar</button>
            </form>
            {userInfo && (
                <label>
                    Usuario Registrado: {userInfo.name} - {userInfo.email}
                </label>
            )}
        </div>
    );
};

export default App;