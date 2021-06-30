import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Administrativo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem>
              <NavLink href="/portfolios">Portfolios</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin Classes
              </DropdownToggle>
              <DropdownMenu right>
                
                
                <DropdownItem>
                  <a href="/cryptos">Criptos nos portfolios</a>
                </DropdownItem>

                <DropdownItem>
                  <a href="/fiis">Fiis nos portfolios</a>
                </DropdownItem>
                
                <DropdownItem divider />

                <DropdownItem>
                  <a href="/radarfiis">Radar Fiis</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/radarcryptos">Radar Crypto</a>
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem>
                  <a href="/categories">Categorias de Investimentos</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/movements">Operações Financeiras</a>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem>
                  <a href="/years">Anos</a>
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;