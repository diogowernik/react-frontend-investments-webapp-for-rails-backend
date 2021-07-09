import React from 'react'
import { Tab, Row, Nav, Card, Col  } from 'react-bootstrap';
import Dashboard from '../dashboard/Dashboard'
import Composition from '../composition/Compostion'
import Dividends from '../dividends/Dividends';
import Location from '../location/Location';
import Radars from '../radar/Radars';
import Orders from '../orders/Orders';
import Taxes from '../taxes/Taxes';
import Tokens from '../tokens/Tokens';


function ComponentNav(props) {
    var id = props.portfolio.id;
    return (

    <Tab.Container defaultActiveKey="dashboard">
        <Row>
            <Col>
                <Card outline color="gray" className="mt-3 mb-3">
                    <Card.Body>
                        <Nav variant="pills">

                            <Nav.Item>
                                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="compostition">Composição</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="location">Localização</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="dividends">Dividendos</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="orders">Operações</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="radar">Radar</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="taxes">Impostos</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="tokens">Token System</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <Tab.Content>
                    <Tab.Pane eventKey="dashboard">
                        <Dashboard id={id}/> 
                    </Tab.Pane>
                    <Tab.Pane eventKey="compostition">
                        <Composition />
                    </Tab.Pane>
                    <Tab.Pane eventKey="location">
                        <Location/> 
                    </Tab.Pane>
                    <Tab.Pane eventKey="dividends">
                        <Dividends />
                    </Tab.Pane>
                    <Tab.Pane eventKey="radar">
                        <Radars />
                    </Tab.Pane>
                    <Tab.Pane eventKey="orders">
                        <Orders />
                    </Tab.Pane>
                    <Tab.Pane eventKey="taxes">
                        <Taxes />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tokens">
                        <Tokens />
                    </Tab.Pane>
                </Tab.Content>
            </Col>            
        </Row>
      </Tab.Container>

    )
  }
  
  export default ComponentNav
