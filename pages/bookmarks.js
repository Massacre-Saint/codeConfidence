import React, { useEffect, useState } from 'react';
import { Loading } from '../components';
import BookmarksList from '../components/containers/BookmarksList';
import { useAuth } from '../utils/context/authContext';
import { getBookmarks } from '../utils/data/bookmarks';

function Bookmarks() {
  const [bookmarks, setBoomarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const loader = async () => {
    const bookmarkData = await getBookmarks();
    setBoomarks(bookmarkData);
    setIsLoading(false);
    console.warn(bookmarks);
  };
  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    <>
      <Loading />
    </>;
  }
  return (
    <>
      {bookmarks.length === 0
        ? (
          <div className="bookmark-page">
            <h1>Oops, you can&apos;t use this feature yet!
              Download Extension here.
            </h1>
          </div>
        )
        : (
          <div className="bookmark-page">
            <BookmarksList bookmarks={bookmarks} />
          </div>
        )}
    </>
  );
}

export default Bookmarks;
