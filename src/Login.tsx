import React, { useState } from 'react';
import { User } from './usersData';

interface LoginProps {
    onLogin: (user: User) => void;
    onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignupClick }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true); // Setăm starea de încărcare pe true înainte de a începe procesul de autentificare

        const usersDataString = localStorage.getItem('users');
        if (!usersDataString) {
            setError('No users found');
            setLoading(false); // Setăm starea de încărcare pe false dacă nu există date de utilizator
            return;
        }

        const usersData: User[] = JSON.parse(usersDataString);
        const foundUser = usersData.find(user => user.username === username && user.password === password);

        setTimeout(() => {
            if (foundUser) {
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                onLogin(foundUser);
                setError('');
                setLoginSuccess(true);
            } else {
                setError('Invalid username or password');
                setLoginSuccess(false);
            }
            setLoading(false); // Setăm starea de încărcare pe false după ce procesul de autentificare este complet
        }, 1500); // Așteptăm 1.5 secunde (1500 milisecunde) înainte de a verifica rezultatul autentificării
    };

    return (
        <div className={'Login'}>
            <h2>Log in</h2>
            <input
                className={'padding'}
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                className={'padding'}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loginSuccess && !loading && <p style={{ color: 'green' }}>Login successful!</p>}
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
                Don't have an account? <a href="#" onClick={onSignupClick}>Sign up here</a>
            </p>
        </div>
    );
};

export default Login;
