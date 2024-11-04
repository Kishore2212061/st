const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateDynamicPassword = require('../utils/generatePassword');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, password, uniqueValue, fixedValue, trigFunction, keyValue1 } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const newUser = new User({ 
            username, 
            password,
            uniqueValue, 
            fixedValue, 
            trigFunction, 
            keyValue1 
        });
        

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, dynamicPassword, keyValue } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const calculatedDynamicPassword = generateDynamicPassword(
            user.password,
            user.uniqueValue,
            user.fixedValue,
            keyValue,
            currentHour,
            user.trigFunction
        );
        console.log(calculatedDynamicPassword);

        if (calculatedDynamicPassword === dynamicPassword) {
            res.json({ message: 'Login successful' });
        } else {
            console.log(calculatedDynamicPassword)

            res.status(400).json({ error: 'Invalid dynamic password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
