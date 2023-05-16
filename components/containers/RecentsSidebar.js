import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-icons';
import { BiTimeFive } from 'react-icons/bi';
import SortBtnGroup from '../buttons/SortBtnGroup';
import RecentsList from './RecentsList';
import CondionalArrayRenderer from './CondionalArrayRenderer';

function RecentsSidebar({ goals, topics }) {
  const [showGoals, setShowGoals] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const hanldeFilteredState = (e) => {
    const button = e.target.id;
    switch (button) {
      case '1':
        setShowAll(true);
        setShowTopics(false);
        setShowGoals(true);
        break;
      case '2':
        setShowAll(true);
        setShowGoals(false);
        setShowTopics(true);
        break;
      case '3':
        setShowGoals(false);
        setShowTopics(false);
        setShowAll(true);
        break;
      default:
        setShowAll(false);
    }
  };

  const recentsRadioGroup = [
    {
      name: 'Goals',
      value: '1',
      id: 'goals',
    },
    {
      name: 'Topics',
      value: '2',
      id: 'topics',
    },
    {
      name: 'Resources',
      value: '3',
      id: 'resources',
    },
  ];
  return (
    <>
      <div>
        Your Recents
        <BiTimeFive />
      </div>
      <SortBtnGroup
        radioGroup={recentsRadioGroup}
        handleFilter={hanldeFilteredState}
        filteredArray={[goals, topics]}
      />
      {showAll
        ? (
          <CondionalArrayRenderer
            jaggedArray={[goals, topics]}
            showingGoals={showGoals}
            showingTopics={showTopics}
          />
        )
        : (
          <RecentsList list={[...goals, ...topics]} />
        )}
    </>
  );
}

export default RecentsSidebar;

RecentsSidebar.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.shape({
  })),
  topics: PropTypes.arrayOf(PropTypes.shape({
  })),
};
RecentsSidebar.defaultProps = {
  goals: [],
  topics: [],
};
