import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import MediaQuery from 'react-responsive';
import BookmarkSidebar from '../containers/overlays/BookmarkSidebar';

export default function LearnedTechNav({
  lTech, handleShowAll, handleShow, showAll, goals, topics, bookmarks, resources, onUpdate,
}) {
  const [show, setShow] = useState(false);
  const handleShowSidebar = () => setShow(true);
  const handleClose = () => setShow(false);
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
                  {bookmarks.length > 0
                    ? (
                      <NavDropdown.Item href="#action/3.4" onClick={handleShowSidebar}>
                        Bookmarks
                      </NavDropdown.Item>
                    )
                    : ('')}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <BookmarkSidebar
          show={show}
          handleClose={handleClose}
          lTech={lTech}
          goals={goals}
          topics={topics}
          bookmarks={bookmarks}
          resources={resources}
          onUpdate={onUpdate}
        />
      </MediaQuery>

      <MediaQuery minWidth={769}>
        <Nav variant="tabs" navbar="True" className="sub-nav">
          <Nav.Item>
            <Nav.Link eventKey="3" active={false} target="_blank" href={lTech.tech.docUrl}>Documentation</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Goals" menuVariant="dark">
            <NavDropdown.Item eventKey="4" id="goals" onClick={(e) => handleShowAll(e)}>View All</NavDropdown.Item>
            {showAll ? (
              <NavDropdown.Item eventKey="4.1" onClick={(e) => handleShow(e)} id="goal">
                Create
              </NavDropdown.Item>
            ) : ('')}
          </NavDropdown>

          <NavDropdown title="Topics" menuVariant="dark">
            <NavDropdown.Item eventKey="5.1" id="topics" onClick={(e) => handleShowAll(e)}>View All</NavDropdown.Item>
            {showAll ? (
              <NavDropdown.Item eventKey="4.1" onClick={(e) => handleShow(e)} id="topic">
                Create
              </NavDropdown.Item>
            ) : ('')}
          </NavDropdown>
          {bookmarks.length > 0
            ? (
              <Nav.Item>
                <Nav.Link onClick={handleShowSidebar}>
                  BookMarks
                </Nav.Link>
              </Nav.Item>
            )
            : ('')}
        </Nav>
        <BookmarkSidebar
          show={show}
          handleClose={handleClose}
          lTech={lTech}
          goals={goals}
          topics={topics}
          bookmarks={bookmarks}
          resources={resources}
          onUpdate={onUpdate}
        />
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
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  bookmarks: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    index: PropTypes.number,
    parentId: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
  }))).isRequired,
  resources: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    bookmark: PropTypes.shape({
      id: PropTypes.number,
    }),
    objectId: PropTypes.shape({
      id: PropTypes.string,
    }),
    tech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
LearnedTechNav.defaultProps = {
  handleShow: () => {},
  showAll: false,
};
