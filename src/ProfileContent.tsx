import React from "react";
import { Collapse } from "antd";
import { FirstInterface, SecondInterface } from "./Interfaces.ts";
import imageSrc from './assets/4.jpg';

interface ProfileContentProps {
    data: FirstInterface | SecondInterface;
}

const { Panel } = Collapse;

const ProfileContent: React.FC<ProfileContentProps> = ({ data }) => {
    return (
        <div className={'ProfilContent'}>
            <div>
                <h2>Profile Content</h2>
                <div>
                    <img className={"ProfileImage"} src={imageSrc} alt="Description of the image"/>
                    <p style={{ paddingLeft: 17 }}>{`${data.field1}`}</p>
                </div>
            </div>
            <div style={{ padding:30,flex:1, paddingRight:450 }}>
                <Collapse defaultActiveKey={['1']} >
                    <Panel header="Info Profile" key="1">
                        <p>{`Age: ${data.field2}`}</p>
                        <p>{`Verification Age: ${data.field3}`}</p>
                        <p>{`Grupa: ${data.field4}`}</p>
                        <p>{`Salariu: ${data.field5} Lei`}</p>
                        {('field6' in data) && <p>{`Logged: ${(data as SecondInterface).field6}`}</p>}
                        {('field7' in data) && <p>{`${(data as SecondInterface).field7}`}</p>}
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
};

export default ProfileContent;
