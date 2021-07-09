import React from "react";
import { Row, Col, Card,CardBody, Container } from 'reactstrap'
import AppTopNavBar from "../../layouts/_AppTopNav"

export const AppIndexLayout = ({ children }) => {
  return (
    <>
        <AppTopNavBar/>
        <Container>
            <Row>
                <Col xl={ 3 } className="mt-4">
                        <Card outline color="gray" className="mb-3">
                            <CardBody>
                                Administre ao lado seus portfolios
                            </CardBody>
                        </Card>
                </Col>
                <Col xl={ 9 }>
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
    </>
    
  );
};