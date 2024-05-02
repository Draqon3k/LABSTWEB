// SidebarCustom.tsx
import React from "react";
import { Menu, Layout } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onSelectMenu: (key: string) => void;
}

const SidebarCustom = ({ collapsed, onSelectMenu }: SidebarProps) => {
    const navigate = useNavigate();
    const handleMenuSelect = ({ key }: { key: React.Key }) => {
        onSelectMenu(key.toString());
        navigate(`/${key}`);
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                onSelect={handleMenuSelect}
            >
                <Menu.Item key="profile" icon={<UserOutlined />} ><Link to="/profile">Profile</Link></Menu.Item>
                <Menu.Item key="content" icon={<VideoCameraOutlined />} ><Link to="/content">Content</Link></Menu.Item>
                <Menu.Item key="updata" icon={<UploadOutlined />} ><Link to="/updata">UpData</Link></Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SidebarCustom;
