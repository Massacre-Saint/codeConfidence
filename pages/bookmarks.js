import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import getBookmarks from '../utils/data/bookmarks';

function Bookmarks() {
  const { user } = useAuth();
  const testMe = () => {
    getBookmarks(user);
  };
  return (
    <div><Button onClick={testMe}>BookMark</Button></div>
  );
}

export default Bookmarks;
