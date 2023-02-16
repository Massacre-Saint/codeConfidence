import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import getMessage from '../../utils/data/messages';

export default function Messages() {
  const [message, setMessage] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getMessage().then(setMessage);
  }, [user]);

  return (
    <div>
      <h3>&quot;{message.title}&quot;</h3>
      <span> - {message.author}</span>
    </div>
  );
}
