import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import MediaQuery from 'react-responsive';

export default function LearnedTechNav() {
  return (
    <>
      <MediaQuery maxWidth={768}>
        <Navbar variant="dark" className="collaped-l-tech_nav">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Choose"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1">Docs</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Goals
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Topics</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Bookmarks
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </MediaQuery>

      <MediaQuery minWidth={769}>
        <Nav variant="tabs" navbar="True">
          <Nav.Item>
            <Nav.Link className="nav-link" href="/home">Documentation</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Goals" id="nav-dropdown-dark" menuVariant="dark">
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
      </MediaQuery>
    </>
  );
}
