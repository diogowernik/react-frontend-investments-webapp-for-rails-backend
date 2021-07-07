import React from "react";
import { Container } from 'reactstrap'
import BodyWrapper from "./BodyWrapper";
import AppTopNavBar from "./AppTopNav"
import "./CustomStyle.css"

export const MainLayout = ({ children }) => {


  
  return (
    <BodyWrapper>
        <AppTopNavBar/>
        <Container>
            <section className="sm:flex-row flex flex-col flex-1">
            <div className="content-box" style={{ flexGrow: 2, flexBasis: "0%" }} >

                {children}
                
            </div>
            </section>
      </Container>
    </BodyWrapper>
    
  );
};