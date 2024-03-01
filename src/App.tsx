import React, {useState} from "react";
import {Layout} from 'antd';
import SidebarCustom from "./Commponents/layouts/SidebarCustom";
import HeaderCustom from "./Commponents/layouts/HeaderCustom";
import ContentCustom from "./Commponents/layouts/ContentCustom";

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <SidebarCustom collapsed={collapsed} />
            <Layout>
                <HeaderCustom  setCollapsed={setCollapsed} />
                <ContentCustom />
            </Layout>
        </Layout>
    );
};
export default App;