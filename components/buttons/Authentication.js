import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn, signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

function AuthenticationButton() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>Sign In</Button>
    );
  }
  return (
    <Button variant="danger" type="button" size="sm" className="copy-btn" onClick={signOut}>
      Sign Out
    </Button>
  );
}

export default AuthenticationButton;
