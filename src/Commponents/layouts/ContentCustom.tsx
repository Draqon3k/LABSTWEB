import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, DatePicker, Row, Col } from "antd";
const { Content } = Layout;
import ProfileContent from "../../ProfileContent.tsx";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

interface ContentCustomProps {
    selectedMenuKey: string;
}

interface CardData {
    id: number;
    input1: string;
    input2: string;
    input3: string;
}

const ContentCustom: React.FC<ContentCustomProps> = ({ selectedMenuKey }) => {
    const [input1, setInput1] = useState<string>("");
    const [input2, setInput2] = useState<string>("");
    const [input3, setInput3] = useState<string>("");
    const [cards, setCards] = useState<CardData[]>([]);

    // La încărcarea componentei, încarcă cardurile salvate din localStorage
    useEffect(() => {
        const savedCards = localStorage.getItem("cards");
        if (savedCards) {
            setCards(JSON.parse(savedCards));
        }
    }, []);

    const handleInputChange = (_name: string, value: string) => {
        if (_name === "input1") {
            // Allow only alphabetic characters for "Name"
            setInput1(value.replace(/[^a-zA-Z ]/g, ""));
        } else if (_name === "input2") {
            // Allow only numeric characters for "Tel.nr"
            setInput2(value.replace(/[^0-9]/g, ""));
        } else if (_name === "input3") {
            setInput3(value);
        }
    };

    const handleAddCard = () => {
        const newCard: CardData = {
            id: Date.now(),
            input1,
            input2,
            input3,
        };
        const newCards = [...cards, newCard];
        setCards(newCards);
        // Salvare carduri în localStorage
        localStorage.setItem("cards", JSON.stringify(newCards));
        // Reset input values after adding the card
        setInput1("");
        setInput2("");
        setInput3("");
    };

    const handleDeleteCard = (id: number) => {
        const updatedCards = cards.filter(card => card.id !== id);
        setCards(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
    };


    return (
        <Content style={{ margin: "40px 100px", paddingRight: 100 , minHeight:559, maxHeight:650}}>
            {selectedMenuKey === "1" && (
                // Content for "Profile"
                <div>
                    <ProfileContent data={{
                        field1: "Andriuta Dragos",
                        field2: 20,
                        field3: true,
                        field4: ["CR-221"],
                        field5: 10000,
                        field6: new Date(),
                        field7: "Excalibur"
                    }} />
                </div>
            )}
            {selectedMenuKey === "2" && (
                <div>
                    <h2>Cards details</h2>
                    <Row gutter={[16, 16]}>
                        {cards.map(card => (
                            <Col key={card.id} xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Card title="Info about my friend">
                                    <p>{`Name: ${card.input1}`}</p>
                                    <p>{`Tel.nr: ${card.input2}`}</p>
                                    <p>{`Date of birth: ${card.input3}`}</p>
                                    <div style={{ textAlign: "right" }}>
                                        <DeleteOutlined onClick={() => handleDeleteCard(card.id)} style={{ color: "red", cursor: "pointer" }} />
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
            {selectedMenuKey === "3" && (
                // Content for "Data"
                <div>
                    <h2>New Card</h2>
                    <Input
                        className="custom-input"
                        name="input1"
                        value={input1}
                        onChange={(e) => handleInputChange("input1", e.target.value)}
                        placeholder="Name"
                    />
                    <Input
                        className="custom-input"
                        name="input2"
                        value={input2}
                        onChange={(e) => handleInputChange("input2", e.target.value)}
                        placeholder="Telefon number"
                    />
                    <DatePicker
                        className="custom-input"
                        name="input3"
                        value={input3 ? moment(input3) : null}
                        onChange={(_date: moment.Moment | null, dateString: string | string[]) => {
                            if (typeof dateString === "string") {
                                setInput3(dateString);
                            }
                        }}
                        placeholder="Date of brith"
                    />

                    <Button type="primary" onClick={handleAddCard}>
                        Add Card
                    </Button>
                </div>
            )}
        </Content>
    );
};

export default ContentCustom;
