import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const AppNavBar = (props) => {


  return (
    
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Meus Investimentos</NavbarBrand>
        <Nav className="ml-auto" navbar>         
          <NavItem className="ml-auto">
            <NavLink href="/app">App</NavLink>
          </NavItem>
          <NavItem className="ml-auto">
            <NavLink href="/admin">Admin</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      </div>
    );
}

export default AppNavBar;