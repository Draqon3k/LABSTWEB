
import { Layout,Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { useState, Dispatch, SetStateAction } from "react";

interface HeaderCustomProps {
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const { Header } = Layout;

const HeaderCustom: React.FC<HeaderCustomProps> = ({ setCollapsed }) => {
    const [collapsed, setCollapsedLocal] = useState(false);

    const toggleCollapsed = () => {
        setCollapsedLocal(!collapsed);
        setCollapsed(!collapsed);
    };

    return (
        <Header  style={{background:"white"}} >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined  />}
                onClick={toggleCollapsed}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    );
};

export default HeaderCustom;
