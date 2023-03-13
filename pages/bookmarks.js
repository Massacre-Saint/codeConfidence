import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { importBookmarks, getBookmarks } from '../utils/data/bookmarks';

function Bookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBoomarks] = useState([]);
  const testMe = () => {
    importBookmarks();
  };
  useEffect(() => {
    getBookmarks().then(setBoomarks);
  }, [user]);
  return (
    <div>
      <Button onClick={testMe}>
        {bookmarks.length === 0
          ? ('Import Bookmarks')
          : ('Update Bookmarks')}
      </Button>
    </div>
  );
}

export default Bookmarks;
