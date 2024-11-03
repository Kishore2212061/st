// client/src/Register.js
import React, { useState } from 'react';
import axios from './api'; // Ensure this points to your Axios instance

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [uniqueValue, setUniqueValue] = useState('');
    const [fixedValue, setFixedValue] = useState('');
    const [trigFunction, setTrigFunction] = useState('sin');
    const [keyValue1, setKeyValue1] = useState(''); // New key value state

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', {
                username,
                password,
                uniqueValue: parseFloat(uniqueValue),
                fixedValue: parseFloat(fixedValue),
                trigFunction,
                keyValue1: parseFloat(keyValue1), // Include key values in the request
            });
            alert('Registration successful!');
        } catch (error) {
            console.error(error);
            alert('Registration failed: ' + error.response.data.error);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="number"
                    value={uniqueValue}
                    onChange={(e) => setUniqueValue(e.target.value)}
                    placeholder="Unique Value"
                    required
                />
                <input
                    type="number"
                    value={fixedValue}
                    onChange={(e) => setFixedValue(e.target.value)}
                    placeholder="Fixed Value"
                    required
                />
                <select value={trigFunction} onChange={(e) => setTrigFunction(e.target.value)}>
                    <option value="sin">Sin</option>
                    <option value="cos">Cos</option>
                    <option value="tan">Tan</option>
                </select>
                <input
                    type="number"
                    value={keyValue1}
                    onChange={(e) => setKeyValue1(e.target.value)}
                    placeholder="Key Value 1" // First key value input
                    required
                />
          
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
