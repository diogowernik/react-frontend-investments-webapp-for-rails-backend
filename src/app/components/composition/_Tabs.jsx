import React from 'react'
import { Tab, Nav  } from 'react-bootstrap';
import Portfoliofiis from './tabs/Portfoliofiis'
import Portfoliocriptos from './tabs/Portfoliocriptos'



function ComponentNav(props) {
    // var id = props.portfolio.id;
    return (

    <Tab.Container defaultActiveKey="dashboard">
        <Nav variant="tabs">
            <Nav.Item>
                <Nav.Link eventKey="dashboard">Fundos Imobiliários</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="compostition">Criptomoedas</Nav.Link>
            </Nav.Item>
        </Nav>
        <Tab.Content>
            <Tab.Pane eventKey="dashboard">
                <Portfoliofiis/>
            </Tab.Pane>
            <Tab.Pane eventKey="compostition">
               <Portfoliocriptos/>
            </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

    )
  }
  
  export default ComponentNav
