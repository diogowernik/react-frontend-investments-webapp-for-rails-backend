import React from "react";
// import { Container } from 'reactstrap'
import {Container, Tab, Row, Nav, Card, Col  } from 'react-bootstrap';
import AdminNavBar from "./_AdminNav"
import Categories from "../components/categories/Categories2"
import Fiis from "../components/fiis/Fiis"
import Criptos from "../components/criptos/Criptos"
import Portfolios from "../components/portfolios/Portfolios"
import Portfoliofiis from "../components/portfoliofiis/Portfoliofiis"
import Portfoliocriptos from "../components/portfoliocriptos/Portfoliocriptos"
import Years from "../components/years/Years"

function AdminLayout(props) {
    return (
    <>
    <Container>
        <AdminNavBar/>
        <Tab.Container defaultActiveKey="categories">
            <Row>
                <Col xl={3}>                                          
                    <Nav variant="pills" className="flex-column">
                        <Card  color="gray" className="mt-3 mb-3">
                            <Card.Body>
                                <Nav.Item>
                                    <Nav.Link eventKey="categories">Categories</Nav.Link>
                                </Nav.Item>
                                
                                <Nav.Item>
                                    <Nav.Link eventKey="fiis">Fundos Imobiliários</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="criptos">Criptomoedas</Nav.Link>
                                </Nav.Item>
                            </Card.Body>
                        </Card>
                        <Card  color="gray" className="mt-3 mb-3">
                            <Card.Body>
                                <Nav.Item>
                                    <Nav.Link eventKey="portfolios">Portfolios</Nav.Link>
                                </Nav.Item>
                                
                                <Nav.Item>
                                    <Nav.Link eventKey="portfoliofiis">Fundos Imobiliários nos Portfolios</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="portfoliocriptos">Criptomoedas nos Portfolios</Nav.Link>
                                </Nav.Item>
                            </Card.Body>
                        </Card>
                        <Card  color="gray" className="mt-3 mb-3">
                            <Card.Body>
                                <Nav.Item>
                                    <Nav.Link eventKey="years">Anos</Nav.Link>
                                </Nav.Item>
                            </Card.Body>
                        </Card>
                    </Nav>
                            
                    
                </Col>
                <Col xl={9}>
                <Card  color="gray" className="mt-3 mb-3">
                    <Card.Body>
                        <Tab.Content>

                        <Tab.Pane eventKey="categories">
                            <Categories />
                        </Tab.Pane>

                        <Tab.Pane eventKey="fiis">
                            <Fiis />
                        </Tab.Pane>

                        <Tab.Pane eventKey="criptos">
                            <Criptos />
                        </Tab.Pane>

                        <Tab.Pane eventKey="portfolios">
                            <Portfolios />
                        </Tab.Pane>

                        <Tab.Pane eventKey="portfoliofiis">
                            <Portfoliofiis />
                        </Tab.Pane>

                        <Tab.Pane eventKey="portfoliocriptos">
                            <Portfoliocriptos />
                        </Tab.Pane>

                        <Tab.Pane eventKey="years">
                            <Years />
                        </Tab.Pane>

                        
                    </Tab.Content>
                    </Card.Body>
                </Card>
                </Col>            
            </Row>
        </Tab.Container>
    </Container>
    </>
    )
  }
  
  export default AdminLayout

  
