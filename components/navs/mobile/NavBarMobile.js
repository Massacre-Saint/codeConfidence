import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

function NavBarMobile({ userCreated }) {
  if (userCreated) {
    return (
      <Navbar className="main-navbar" fixed="bottom" collapseOnSelect expand="true">
        <Container>
          <Link passHref href="/" className="nav-item">
            Home
          </Link>
          <Link passHref href="/goals" className="nav-item">
            Goals
          </Link>
          <Link passHref href="/topics" className="nav-item">
            Topics
          </Link>
          <Link passHref href="/bookmarks" className="nav-item">
            Bookmarks
          </Link>
          <Link passHref href="/lTech" className="nav-item">
            Learn
          </Link>
        </Container>
      </Navbar>
    );
  }
  return (
    <Container>
      <Link passHref href="/" className="nav-item">
        Home
      </Link>
    </Container>

  );
}

export default NavBarMobile;

NavBarMobile.propTypes = {
  userCreated: PropTypes.bool.isRequired,
};
