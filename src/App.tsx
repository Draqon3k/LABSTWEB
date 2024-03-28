// App.tsx
import React, { useState } from "react";
import { Layout } from 'antd';
import SidebarCustom from "./Commponents/layouts/SidebarCustom";
import HeaderCustom from "./Commponents/layouts/HeaderCustom";
import ContentCustom from "./Commponents/layouts/ContentCustom";

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState("1");



    return (
        <Layout className={'Layout'}>
            <SidebarCustom collapsed={collapsed} onSelectMenu={setSelectedMenuKey} />
            <Layout>
                <HeaderCustom setCollapsed={setCollapsed}/>
                <ContentCustom selectedMenuKey={selectedMenuKey}/>

            </Layout>
        </Layout>
    );
};
export default App;
