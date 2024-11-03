import React from 'react';
import Login from './Login';
import Register from './Register'; // Import the Register component

function App() {
    return (
        <div className="App">
            <h1>Dynamic Password Login</h1>
            <Register />  {/* Include the Register component */}
            <Login />     {/* Include the Login component */}
        </div>
    );
}

export default App;
