import React from "react";
import { Row, Col, Card,CardHeader, CardBody, Container, Nav, DropdownItem, } from 'reactstrap'
import BodyWrapper from "./BodyWrapper";
import AdminNavBar from "./AdminNav"
import "./CustomStyle.css"

export const DashboardLayout = ({ children }) => {
  return (
    <BodyWrapper>
        <AdminNavBar/>
        <Container>
            <Row>
                <Col md={ 3 } className="mt-4">
                        <Card outline color="gray" className="mb-3">
                            <CardHeader className="bg-gray-lighter">Menu Administrativo</CardHeader>
                            <CardBody>
                            <Nav className="mr-auto" navbar>  
                                
                                <DropdownItem>
                                    <a href="/admin/categories">Categorias de Investimentos</a>
                                </DropdownItem>

                                <DropdownItem divider />
                                <DropdownItem>
                                    <a href="/admin/fiis">Fundos Imobiliários</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a href="/admin/criptos">Criptomoedas</a>
                                </DropdownItem>

                                <DropdownItem divider />
                                <DropdownItem>
                                <a href="/admin/portfolios">Portfolios</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a href="/admin/portfoliocriptos">Criptos nos portfolios</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a href="/admin/portfoliofiis">Fiis nos portfolios</a>
                                </DropdownItem>

                                <DropdownItem divider />
                                <DropdownItem>
                                <a href="/admin/years">Anos</a>
                                </DropdownItem>      
                            </Nav>
                            </CardBody>
                        </Card>
                </Col>
                <Col md={ 9 }>
                    <section className="sm:flex-row flex flex-col flex-1">
                    <div
                        className="content-box"
                        style={{ flexGrow: 2, flexBasis: "0%" }}
                    >
                        {children}
                    </div>
                    </section>
                </Col>
                    
            </Row>
      </Container>
    </BodyWrapper>
    
  );
};