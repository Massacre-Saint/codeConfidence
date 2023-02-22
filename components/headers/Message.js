import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import getMessage from '../../utils/data/messages';

export default function Messages() {
  const [message, setMessage] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    getMessage().then((array) => {
      if (isMounted) {
        setMessage(array);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div>
      <span>
        <h3 className="message">&quot;{message.title}&quot;</h3>
        <div> - {message.author}</div>
      </span>
    </div>
  );
}
