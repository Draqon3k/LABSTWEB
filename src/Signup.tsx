// File: Signup.tsx

import React, { useState } from 'react';
import usersData, { User } from './usersData';
import { Link, useNavigate } from 'react-router-dom';

interface SignupProps {
    onSignup: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        // Verificăm dacă există deja un utilizator cu acest username
        const existingUser = usersData.find(user => user.username === username);
        if (existingUser) {
            setError('Username already exists');
        } else {
            // Creăm un utilizator nou și îl adăugăm în lista de utilizatori
            const newUser: User = { username, password };
            usersData.push(newUser);
            // Salvăm lista actualizată în localStorage
            localStorage.setItem('users', JSON.stringify(usersData));
            // Apelăm funcția de înregistrare pentru a notifica aplicația părinte
            onSignup(newUser);
            // Resetează câmpurile de input
            setUsername('');
            setPassword('');
            setError('');
            navigate('/profile');
        }
    };

    return (
        <div className={'SignUp'}>
            <h2>Sign up</h2>
            <input className={'padding'} type="text" placeholder="Username" value={username}
                   onChange={e => setUsername(e.target.value)}/>
            <input className={'padding'} type="password" placeholder="Password" value={password}
                   onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleSignup}>Sign up</button>
            {error && <p style={{color : 'red'}}>{error}</p>}
            <p style={{marginTop : '10px', textAlign : 'center'}}>
                If you have an acc <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Signup;