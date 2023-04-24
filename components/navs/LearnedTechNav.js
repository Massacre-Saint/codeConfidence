import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import MediaQuery from 'react-responsive';

export default function LearnedTechNav({
  lTech, handleShowAll,
}) {
  return (
    <>
      <MediaQuery maxWidth={768}>
        <Navbar variant="dark" className="collaped-l-tech_nav sub-nav">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Choose"
                  menuVariant="dark"
                >
                  <NavDropdown.Item target="_blank" href={lTech.tech.docUrl}>Docs</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" id="goals" onClick={(e) => handleShowAll(e)}>
                    Goals
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" id="topics" onClick={(e) => handleShowAll(e)}>Topics</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" id="bookmarks" onClick={(e) => handleShowAll(e)}>
                    Bookmarks
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </MediaQuery>

      <MediaQuery minWidth={769}>
        <Nav variant="tabs" navbar="True" className="sub-nav">
          <Nav.Item>
            <Nav.Link eventKey="3" active={false} target="_blank" href={lTech.tech.docUrl}>Documentation</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="4" id="goals" onClick={(e) => handleShowAll(e)}>
              Goals
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="5" id="topics" onClick={(e) => handleShowAll(e)}>
              Topics
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="6" id="bookmarks" onClick={(e) => handleShowAll(e)}>
              BookMarks
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </MediaQuery>
    </>
  );
}

LearnedTechNav.propTypes = {
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
    }),
  }).isRequired,
  handleShowAll: PropTypes.func.isRequired,
};
LearnedTechNav.defaultProps = {

};
