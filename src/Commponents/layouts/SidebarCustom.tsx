import { Menu, Layout } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
}

const SidebarCustom = ({ collapsed }: SidebarProps) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="1" icon={<UserOutlined />} >Profile</Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />} >Content</Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />} >Data</Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SidebarCustom;