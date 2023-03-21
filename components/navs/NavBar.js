/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import PropTypes from 'prop-types';
import AuthenticationButton from '../buttons/Authentication';
import { checkUser } from '../../utils/data';

export default function NavBar({ user }) {
  const [userCreated, setUserCreated] = useState(false);
  useEffect(() => {
    checkUser(user.uid).then((response) => {
      if (response.valid !== false) {
        setUserCreated(true);
      }
    });
  });
  if (userCreated) {
    return (
      <Navbar collapseOnSelect expand="lg" className="main-navbar" variant="dark" sticky="top">
        <Container>
          <Link passHref href="/">
            <Navbar.Brand className="nav-image">
              <Image
                src="/logo.v2.svg"
                width={30}
                height={30}
              />
              ode Confidence
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link passHref href="/">
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link passHref href="/goals">
                <Nav.Link>Goals</Nav.Link>
              </Link>
              <Link passHref href="/topics">
                <Nav.Link>Topics</Nav.Link>
              </Link>
              <Link passHref href="/bookmarks">
                <Nav.Link>
                  Bookmarks
                </Nav.Link>
              </Link>
              <Link passHref href="/lTech">
                <Nav.Link>Learn More</Nav.Link>
              </Link>
              <AuthenticationButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="main-navbar" variant="dark" sticky="top">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="nav-image">
            <Image
              src="/logo.v2.svg"
              width={30}
              height={30}
            />
            ode Confidence
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <AuthenticationButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
