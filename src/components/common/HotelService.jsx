import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaUtensils, FaWifi } from "react-icons/fa";

const HotelService = () => {
    return (
        <>
            <Container className="mb-2">
                <Header title={"Our Services"}/>
                <Row>
                    <h4 className="text-center">
                        Services at <span className="hotel-color">Franky Hotel</span>
                        <span className="gap-2">
                            <FaClock/> - 24 Hour Front Desk
                        </span>
                    </h4>
                    <hr />
                    <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.title className="hotel-color">
                                        <FaWifi /> Wifi
                                    </Card.title>
                                    <Card.Text>Stay conected with high-speed internet access.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.title className="hotel-color">
                                        <FaUtensils /> BreakFast
                                    </Card.title>
                                    <Card.Text>Star</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>


                </Row>
            </Container>
        </>
    )
}

export default HotelService;