import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import MediaQuery from 'react-responsive';

export default function LearnedTechNav({
  lTech, handleShowAll, handleShow, showAll,
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
                  <NavDropdown.Item href="#action/3.1">Docs</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" id="goals" onClick={(e) => handleShowAll(e)}>
                    Goals
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" id="topics" onClick={(e) => handleShowAll(e)}>Topics</NavDropdown.Item>
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
        <Nav variant="tabs" navbar="True" className="sub-nav">
          <Nav.Item>
            <Nav.Link eventKey="3" target="_blank" href={lTech.tech.docUrl}>Documentation</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Goals" menuVariant="dark">
            <NavDropdown.Item eventKey="4" id="goals" onClick={(e) => handleShowAll(e)}>View All</NavDropdown.Item>
            {showAll ? (
              <NavDropdown.Item eventKey="4.1" onClick={(e) => handleShow(e)} id="goal">
                Create
              </NavDropdown.Item>
            ) : ('')}
            {/* <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.3">Separated link</NavDropdown.Item> */}
          </NavDropdown>

          <NavDropdown title="Topics" menuVariant="dark">
            <NavDropdown.Item eventKey="5.1" id="topics" onClick={(e) => handleShowAll(e)}>View All</NavDropdown.Item>
            {showAll ? (
              <NavDropdown.Item eventKey="4.1" onClick={(e) => handleShow(e)} id="topic">
                Create
              </NavDropdown.Item>
            ) : ('')}
            {/* <NavDropdown.Divider />
            <NavDropdown.Item eventKey="5.4">Separated link</NavDropdown.Item> */}
          </NavDropdown>

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

LearnedTechNav.propTypes = {
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
    }),
  }).isRequired,
  handleShowAll: PropTypes.func.isRequired,
  handleShow: PropTypes.func,
  showAll: PropTypes.bool,
};
LearnedTechNav.defaultProps = {
  handleShow: () => {},
  showAll: false,
};
