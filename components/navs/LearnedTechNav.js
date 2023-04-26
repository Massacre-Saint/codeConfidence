import React from 'react';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';

export default function LearnedTechNav({
  lTech, handleShowAll,
}) {
  return (
    <>
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
      </Nav>
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
