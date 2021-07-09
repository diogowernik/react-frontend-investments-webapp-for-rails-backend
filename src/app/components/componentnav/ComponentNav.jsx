import React from 'react'
import { Tab, Row, Nav, Card, Col  } from 'react-bootstrap';
import Dashboard from '../dashboard/Dashboard'
import Composition from '../composition/Compostion'
import Dividends from '../dividends/Dividends';
import Location from '../location/Location';


function ComponentNav(props) {
    var id = props.portfolio.id;
    return (

    <Tab.Container defaultActiveKey="first">
        <Row>
            <Col>
                <Card outline color="gray" className="mt-3 mb-3">
                    <Card.Body>
                        <Nav variant="pills">

                            <Nav.Item>
                                <Nav.Link eventKey="first">Dashboard</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="second">Composição</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="third">Localização</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Dividendos</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <Dashboard id={id}/> 
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <Composition />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        <Location/> 
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                        <Dividends />
                    </Tab.Pane>
                </Tab.Content>
            </Col>            
        </Row>
      </Tab.Container>

    )
  }
  
  export default ComponentNav
