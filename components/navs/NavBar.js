/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import AuthenticationButton from '../buttons/Authentication';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
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
            <Link passHref href="/lTech/">
              <Nav.Link>+</Nav.Link>
            </Link>
            <AuthenticationButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
