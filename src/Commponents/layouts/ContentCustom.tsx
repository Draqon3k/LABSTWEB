import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button, DatePicker, Row, Col, Divider, Space, Modal } from "antd";
const { Content } = Layout;
import ProfileContent from "../../ProfileContent.tsx";
import moment from "moment";
import { DeleteOutlined,EditOutlined  } from "@ant-design/icons";

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
    const [cards, setCards] = useState<CardData[]>([])
    const [editingCard, setEditingCard] = useState<CardData | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
    const [cardToDelete, setCardToDelete] = useState<CardData | null>(null);

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


    const showDeleteConfirm = (card: CardData) => {
        setCardToDelete(card);
        setConfirmDeleteVisible(true);
    };

    const handleDeleteCancel = () => {
        setConfirmDeleteVisible(false);
        setCardToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (cardToDelete) {
            // Așteaptă 2 secunde înainte de ștergere
            setTimeout(() => {
                const updatedCards = cards.filter(card => card.id !== cardToDelete.id);
                setCards(updatedCards);
                localStorage.setItem("cards", JSON.stringify(updatedCards));
            }, 2000);

            setConfirmDeleteVisible(false);
            setCardToDelete(null);
        }
    };


    const handleEditCard = (card: CardData) => {
        setEditingCard(card);
        setInput1(card.input1);
        setInput2(card.input2);
        setInput3(card.input3);
        setIsEditModalVisible(true);
    };

    const handleSaveEdit = () => {
        if (editingCard) {
            const updatedCards = cards.map(card => (card.id === editingCard.id ? { ...card, input1, input2, input3 } : card));
            setCards(updatedCards);
            localStorage.setItem("cards", JSON.stringify(updatedCards));
            setIsEditModalVisible(false);
            setEditingCard(null);
        }
    };

    return (
        <Content className={'Content'}  style={{minHeight:559,height:'100%'}} >
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
                    <Row gutter={[40, 40]}>
                        {cards.map(card => (
                            <Col key={card.id} xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Card className={'CardContent'} title="Info about my friend">
                                    <Row align="middle">
                                        <Col xs={16} sm={18} md={18} lg={18} xl={13}>
                                            <p>{`Name: ${card.input1}`}</p>
                                            <p>{`Tel.nr: ${card.input2}`}</p>
                                            <p>{`Date of birth: ${card.input3}`}</p>
                                        </Col>
                                        <Col xs={8} sm={6} md={6} lg={6} xl={6} className={'CardImage'}>
                                        </Col>
                                    </Row>
                                    <div style={{paddingLeft:365}}>
                                        <Space split={<Divider type="vertical" />}>
                                            <EditOutlined
                                                onClick={() => handleEditCard(card)}
                                                style={{ color: "darkgray", cursor: "pointer" }}
                                            />
                                            <DeleteOutlined
                                                onClick={() => showDeleteConfirm(card)}
                                                style={{ color: "darkgray", cursor: "pointer" }}
                                            />
                                        </Space>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Modal
                        title="Confirm Delete"
                        open={confirmDeleteVisible}
                        onOk={handleConfirmDelete}
                        onCancel={handleDeleteCancel}
                    >
                        <p>Are you sure you want to delete this card?</p>
                    </Modal>

                    <Modal
                        title="Edit Card"
                        open={isEditModalVisible}
                        onOk={handleSaveEdit}
                        onCancel={() => setIsEditModalVisible(false)}
                    >
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
                            placeholder="Date of birth"
                        />
                    </Modal>
                </div>
            )}
            {selectedMenuKey === "3" && (
                // Content for "Data"
                <div>
                    <Row>
                    <Col style={{paddingRight:150}} span={12}>
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
                    </Col>
                    </Row>
                </div>
            )}
        </Content>
    );
};

export default ContentCustom;
