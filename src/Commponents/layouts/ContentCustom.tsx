import React, { useState } from "react";
import { Layout, Card, Input, Button, DatePicker } from "antd";
const { Content } = Layout;
import moment from "moment";

interface ContentCustomProps {
    selectedMenuKey: string;
}

interface CardData {
    input1: string;
    input2: string;
    input3: string;
}

const ContentCustom: React.FC<ContentCustomProps> = ({ selectedMenuKey }) => {
    const [input1, setInput1] = useState<string>("");
    const [input2, setInput2] = useState<string>("");
    const [input3, setInput3] = useState<string>("");
    const [cards, setCards] = useState<CardData[]>([]);

    const handleInputChange = (name: string, value: string) => {
        if (name === "input1") {
            // Allow only alphabetic characters for "Name"
            setInput1(value.replace(/[^a-zA-Z ]/g, ""));
        } else if (name === "input2") {
            // Allow only numeric characters for "Tel.nr"
            setInput2(value.replace(/[^0-9]/g, ""));
        } else if (name === "input3") {
            setInput3(value);
        }
    };

    const handleAddCard = () => {
        const newCard: CardData = {
            input1,
            input2,
            input3,
        };
        setCards([...cards, newCard]);
        // Reset input values after adding the card
        setInput1("");
        setInput2("");
        setInput3("");
    };

    return (
        <Content style={{ margin: "40px 100px", paddingRight: 600, minHeight:559}}>
            {selectedMenuKey === "1" && (
                // Content for "Profile"
                <div>
                    <h2>Profile Content</h2>
                    {/* Add specific content for Profile */}
                </div>
            )}
            {selectedMenuKey === "2" && (
                // Content for "Content"
                <div>
                    <h2>Cards details</h2>
                    {/* Display cards only for "Content" */}
                    {cards.map((card, index) => (
                        <Card key={index} title="Info about my friend" style={{ margin: "15px", padding: 0 }}>
                            <p>{`Name: ${card.input1}`}</p>
                            <p>{`Tel.nr: ${card.input2}`}</p>
                            <p>{`Date of brith: ${card.input3}`}</p>
                        </Card>
                    ))}
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
