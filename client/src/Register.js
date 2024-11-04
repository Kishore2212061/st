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

    // Inline CSS styles
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            width: '300px',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        button: {
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#218838',
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                    required
                />
                <input
                    type="number"
                    value={uniqueValue}
                    onChange={(e) => setUniqueValue(e.target.value)}
                    placeholder="Unique Value"
                    style={styles.input}
                    required
                />
                <input
                    type="number"
                    value={fixedValue}
                    onChange={(e) => setFixedValue(e.target.value)}
                    placeholder="Fixed Value"
                    style={styles.input}
                    required
                />
                <select
                    value={trigFunction}
                    onChange={(e) => setTrigFunction(e.target.value)}
                    style={styles.input}
                >
                    <option value="sin">Sin</option>
                    <option value="cos">Cos</option>
                    <option value="tan">Tan</option>
                </select>
                <input
                    type="number"
                    value={keyValue1}
                    onChange={(e) => setKeyValue1(e.target.value)}
                    placeholder="Key Value 1" // First key value input
                    style={styles.input}
                    required
                />
                <button 
                    type="submit" 
                    style={styles.button} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
