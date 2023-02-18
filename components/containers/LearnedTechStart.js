import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import getTech from '../../utils/data/tech';
import BeginJourney from '../buttons/BeginJourney';
import Message from '../headers/Message';
import TechCard from './cards/TechCard';
import LearnedTechCreate from './LearnedTechCreate';

export default function LearnedTechStart({ onUpdate }) {
  const [tech, setTech] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const ref2 = useRef();

  const handleShow = (() => {
    setShow(true);
  });
  const { user } = useAuth();

  const getTechData = () => {
    getTech().then((data) => {
      setLoading(false);
      setTech(data);
    });
  };

  useEffect(() => {
    getTechData();
  }, [user, show]);

  if (loading) {
    return (
      <>
        <Message />
        <Spinner />
      </>
    );
  }
  if (!show) {
    return (
      <>
        <div className="tech-start_container">
          <div className="top-container block center">
            <Message />
            <BeginJourney ref={ref2} handleShow={handleShow} />
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
    <div ref={ref2}>
      <LearnedTechCreate onUpdate={onUpdate} tech={tech} />
    </div>
  );
}

LearnedTechStart.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
