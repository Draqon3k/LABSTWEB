// SidebarCustom.tsx
import React from "react";
import { Menu, Layout } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onSelectMenu: (key: string) => void;
}

const SidebarCustom = ({ collapsed, onSelectMenu }: SidebarProps) => {
    const handleMenuSelect = ({ key }: { key: React.Key }) => {
        onSelectMenu(key.toString());
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
                <Menu.Item key="1" icon={<UserOutlined />} >Profile</Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />} >Content</Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />} >UpData</Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SidebarCustom;
