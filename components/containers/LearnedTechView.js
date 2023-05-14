/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import LearnedTechCard from './cards/LearnedTechCard';
import { getAllGoals } from '../../utils/data/goals';
import { getAllTopics } from '../../utils/data/topics';
import { useAuth } from '../../utils/context/authContext';
import RecentsList from './RecentsList';
import Loading from '../Loading';

export default function LearnedTechView({ tech }) {
  const router = useRouter();
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleClick = (obj) => {
    router.push({
      pathname: `/lTech/${obj.id}`,
      query: { tech: obj.tech.id },
    });
  };
  const getDataAndSetState = () => {
    Promise.all([getAllGoals(user), getAllTopics(user)])
      .then(([a, b]) => {
        setGoals(a);
        setTopics(b);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getDataAndSetState();
  }, [user]);
  return (
    <>
      <div className="tech-view_container">
        <div className="flex-row space-between_shift-down">
          <span className="sub-heading">
            Your Skillset
          </span>
          {/* <span className="sub-heading-sm">
            Expand
          </span> */}
        </div>
        <div className="tech_flex-container">
          {tech.map((i) => (
            <LearnedTechCard handleClick={handleClick} key={i.id} obj={i} />
          ))}
        </div>
        <div className="flex-row space-between_shift-down">
          <span className="sub-heading padding">
            Goals
          </span>
          <span className="sub-heading-sm padding">
            Expand
          </span>
        </div>
        <div className="flex-row margin-l-md gap-col">
          {isLoading ? (
            <Loading />
          ) : (
            <RecentsList list={[...goals]} />
          )}
        </div>
        <div className="flex-row space-between_shift-down">
          <span className="sub-heading padding">
            Topics
          </span>
          <span className="sub-heading-sm padding">
            Expand
          </span>
        </div>
        <div className="flex-row margin-l-md gap-col">
          {isLoading ? (
            <Loading />
          ) : (
            <RecentsList list={[...topics]} />
          )}
        </div>
      </div>
    </>
  );
}

LearnedTechView.propTypes = {
  tech: PropTypes.arrayOf((PropTypes.shape({
    techObj: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
};
