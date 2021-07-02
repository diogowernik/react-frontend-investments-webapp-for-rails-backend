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

const AdminNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Administrativo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>  
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin Classes
              </DropdownToggle>
              <DropdownMenu right>
                
                
                <DropdownItem>
                  <a href="/admin/cryptos">Criptos nos portfolios</a>
                </DropdownItem>

                <DropdownItem>
                  <a href="/admin/fiis">Fiis nos portfolios</a>
                </DropdownItem>
                
                <DropdownItem divider />

                <DropdownItem>
                  <a href="/admin/radarfiis">Radar Fiis</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/admin/radarcryptos">Radar Crypto</a>
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem>
                  <a href="/admin/categories">Categorias de Investimentos</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/admin/movements">Operações Financeiras</a>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem>
                  <a href="/admin/years">Anos</a>
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
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

export default AdminNavBar;