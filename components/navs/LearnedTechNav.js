import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function LearnedTechNav() {
  return (
    <Nav variant="tabs" navbar="True">
      <Nav.Item>
        <Nav.Link className="nav-link" href="/home">Documentation</Nav.Link>
      </Nav.Item>
      <NavDropdown title="Goals" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Topics</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          BookMarks
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
