import React, { useState } from 'react';
import axios from './api'; // Ensure this points to your Axios instance

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dynamicPassword, setDynamicPassword] = useState('');
    const [uniqueValue, setUniqueValue] = useState('');
    const [fixedValue, setFixedValue] = useState('');
    const [keyValue, setKeyValue] = useState('');
    const [trigFunction, setTrigFunction] = useState('sin');

    const calculateDynamicPassword = () => {
        const digitSum = password.split('').reduce((sum, char) => {
            if (!isNaN(parseInt(char, 10))) {
                return sum + parseInt(char, 10); 
            }
            const charCode = char.toLowerCase().charCodeAt(0); 
            if (charCode >= 97 && charCode <= 122) { 
                return sum + (charCode - 96); 
            }
            return sum; 
        }, 0);
        const currentHour = new Date().getHours();
        const angle = currentHour + parseFloat(keyValue); 

        let trigResult;
        switch (trigFunction) {
            case 'sin':
                trigResult = Math.sin(angle);
                break;
            case 'cos':
                trigResult = Math.cos(angle);
                break;
            case 'tan':
                trigResult = Math.tan(angle);
                break;
            default:
                trigResult = Math.sin(angle); // Default to sin
        }

        const calculatedPassword = (digitSum * Math.sin(parseFloat(fixedValue)) * parseFloat(uniqueValue) * trigResult).toFixed(3);
        setDynamicPassword(calculatedPassword); // Set the calculated dynamic password
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', {
                username,
                dynamicPassword: dynamicPassword, 
                keyValue: keyValue 
            });
            alert('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + (error.response?.data?.error || 'An error occurred'));
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="number" value={uniqueValue} onChange={(e) => setUniqueValue(e.target.value)} placeholder="Unique Value" required />
                <input type="number" value={fixedValue} onChange={(e) => setFixedValue(e.target.value)} placeholder="Fixed Value" required />
                <input type="number" value={keyValue} onChange={(e) => setKeyValue(e.target.value)} placeholder="Key Value" required />
                <select value={trigFunction} onChange={(e) => setTrigFunction(e.target.value)}>
                    <option value="sin">Sin</option>
                    <option value="cos">Cos</option>
                    <option value="tan">Tan</option>
                </select>
                <input type="text" value={dynamicPassword} readOnly placeholder="Dynamic Password" />
                <button type="button" onClick={calculateDynamicPassword}>
                    Calculate Dynamic Password
                </button>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
