import React from "react";
import { Container } from 'reactstrap'
import BodyWrapper from "./BodyWrapper";
import AppTopNavBar from "./AppTopNav"
import "./CustomStyle.css"
import Performance from './components/sidemodules/Performance'
import SideModule from './components/sidemodules/SideModuleExample'
import PortfolioTitle from './components/sidemodules/PortfolioTitle';

import AppMenu from './components/menu/AppMenu';

const Api = require('./api/PortfolioApi')

export const MainLayout = ({ children }) => {

  return (
    <BodyWrapper>
        <AppTopNavBar/>
        <Container>
            <section className="sm:flex-row flex flex-col flex-1">
            <div className="content-box" style={{ flexGrow: 2, flexBasis: "0%" }} >
                <Row>
                {errors.length > 0 &&  <div> {errors.map((error, index) => <Alert color="danger" key={index}> {error}</Alert> )} </div> }
                <Col xl={3}>
                    <PortfolioTitle portfolio={portfolio} />              
                    <Performance />
                    <SideModule />
                </Col>
                <Col xl={9}>
                    <AppMenu portfolio={portfolio} />

                    {children}
                    
                </Col>
                </Row>      
            </div>
            </section>
      </Container>
    </BodyWrapper>
    
  );
};