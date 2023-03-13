import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
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
        <MediaQuery minWidth={768}>
          <div className="tech-start_container">
            <div>
              <Message />
              <BeginJourney handleShow={handleShow} />
            </div>
            <div>
              <div className="tech_grid-container">
                {tech.map((i) => (
                  <TechCard key={i.id} obj={i} />
                ))}
              </div>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <div className="tech-start_container">
            <div>
              <Message />
              <BeginJourney handleShow={handleShow} />
            </div>
            <div>
              <div className="tech_grid-container_scaled">
                {tech.map((i) => (
                  <TechCard key={i.id} obj={i} />
                ))}
              </div>
            </div>
          </div>
        </MediaQuery>
      </>
    );
  }

  return (
    <>
      <LearnedTechCreate onUpdate={onUpdate} tech={tech} />
    </>
  );
}

LearnedTechStart.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
