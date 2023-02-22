import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { useAuth } from '../../utils/context/authContext';
import { getTech } from '../../utils/data';
import BeginJourney from '../buttons/BeginJourney';
import Message from '../headers/Message';
import TechCard from './cards/TechCard';
import LearnedTechCreate from './LearnedTechCreate';

export default function LearnedTechStart({ onUpdate }) {
  const [tech, setTech] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleShow = (() => {
    setShow(true);
  });
  const { user } = useAuth();

  const getTechData = () => {
    let isMounted = true;
    getTech().then((data) => {
      if (isMounted) {
        setLoading(false);
        setTech(data);
      }
    });
    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    const cleanUp = getTechData();
    return cleanUp;
  }, [user, show]);

  if (loading) {
    return (
      <>
        <Message />
        <Loading />
      </>
    );
  }
  if (!show) {
    return (
      <>
        <div className="tech-start_container">
          <div className="top-container block center">
            <Message />
            <BeginJourney handleShow={handleShow} />
          </div>
          <div className="tech_grid-container">
            {tech.slice(0, 5).map((i) => (
              <TechCard key={i.id} obj={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <LearnedTechCreate onUpdate={onUpdate} tech={tech} />
    </div>
  );
}

LearnedTechStart.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
