import React, { useState, Dispatch, SetStateAction } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from "@ant-design/icons";
import { User } from "../../usersData";
import { Link, useNavigate } from 'react-router-dom';


interface HeaderCustomProps {
    setCollapsed: Dispatch<SetStateAction<boolean>>;
    setCurrentUser: (user: User | null) => void; // Definiți funcția setCurrentUser
}

const { Header } = Layout;

const HeaderCustom: React.FC<HeaderCustomProps> = ({ setCollapsed, setCurrentUser }) => {
    const [collapsed, setCollapsedLocal] = useState(false);

    const toggleCollapsed = () => {
        setCollapsedLocal(!collapsed);
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null); // Utilizați setCurrentUser pentru a seta utilizatorul curent la null
        navigate('/login');
    };

    const navigate = useNavigate();

    return (
        <Header style={{ background: "white", padding: 0 }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{

                    fontSize: '16px',
                    float: 'right',
                    marginRight: '20px',
                    marginTop:'15px',
                }}
            >
                Logout

            </Button>
            <Link to="/login" onClick={handleLogout}></Link>
        </Header>
    );
};

export default HeaderCustom;
