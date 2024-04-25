import React, { useEffect, useState } from "react";
import { Layout, notification } from 'antd'; // Importăm componenta notification din Ant Design
import SidebarCustom from "./Commponents/layouts/SidebarCustom";
import HeaderCustom from "./Commponents/layouts/HeaderCustom";
import ContentCustom from "./Commponents/layouts/ContentCustom";
import usersData, { User } from './usersData';
import Login from './Login';
import Signup from './Signup';

const { Content } = Layout;

const App: React.FC = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState("1");
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [showLoginSuccessNotification, setShowLoginSuccessNotification] = useState(false); // State pentru afișarea notificării de logare

    const handleLogin = (user: User) => {
        setCurrentUser(user);
        setShowLoginSuccessNotification(true); // Setăm starea pentru afișarea notificării de logare cu succes
    };

    const handleSignup = (user: User) => {
        setCurrentUser(user);
        setShowLogin(true);
        setShowSignup(false);
    };

    const showSignupForm = () => {
        setShowLogin(false);
        setShowSignup(true);
    };

    useEffect(() => {
        const existingUsers = localStorage.getItem('users');
        if (!existingUsers) {
            localStorage.setItem('users', JSON.stringify(usersData));
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (showLoginSuccessNotification) {
            // Afișăm notificarea că autentificarea a avut loc cu succes
            notification.success({
                message: 'Logare reușită',
                description: 'Autentificarea a avut loc cu succes!',
                duration: 5, // Durata în secunde pentru care se afișează notificarea (opțional)
                onClose: () => setShowLoginSuccessNotification(false) // Funția apelată la închiderea notificării (opțional)
            });
        }
    }, [showLoginSuccessNotification]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {currentUser ? (
                <Layout>
                    <SidebarCustom collapsed={collapsed} onSelectMenu={setSelectedMenuKey}/>
                    <Layout>
                        <HeaderCustom setCollapsed={setCollapsed} setCurrentUser={setCurrentUser} />
                        <Content>
                            <ContentCustom selectedMenuKey={selectedMenuKey}/>
                        </Content>
                    </Layout>
                </Layout>
            ) : (
                <>
                    {showLogin && (
                        <Login
                            onLogin={handleLogin}
                            onSignupClick={showSignupForm}
                        />
                    )}
                    {showSignup && (
                        <Signup onSignup={handleSignup} />
                    )}
                </>
            )}
        </Layout>
    );
};

export default App;
