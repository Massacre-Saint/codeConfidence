import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import getTech from '../../utils/data/tech';
import Message from '../headers/Message';
import TechCard from './cards/TechCard';

export default function LearnedTechStart() {
  const [tech, setTech] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const getTechData = () => {
    getTech().then((data) => {
      setLoading(false);
      setTech(data);
    });
  };

  useEffect(() => {
    getTechData();
  }, [user]);

  if (loading) {
    return (
      <>
        <Message />
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Message />
      {tech.map((i) => (
        <TechCard key={i.id} obj={i} />
      ))}
    </>
  );
}
