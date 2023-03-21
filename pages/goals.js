import React, { useEffect, useState } from 'react';
import { GoalList, Loading } from '../components';
import ShowEditDelete from '../components/buttons/ShowEditDelete';
import SortDropdown from '../components/buttons/SortDropdown';
import ToggleButtons from '../components/navs/ToggleButtons';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech, getTech } from '../utils/data';
import { getAllGoals } from '../utils/data/goals';
import { getResources } from '../utils/data/resources';
import { getAllTopics } from '../utils/data/topics';

export default function Goals() {
  const { user } = useAuth();
  const [, setLTech] = useState({});
  const [lTechGoals, setLTechGoals] = useState([]);
  const [, setLTechTopics] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [edit, setEdit] = useState(false);
  const [, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleEdit = (e) => {
    if (e.target.id === 'edit') {
      setEdit(true);
    } else if (e.target.id === 'exit') {
      setEdit(false);
    } else {
      setEdit(false);
    }
  };
  const loader = async () => {
    const techData = await getTech();
    const learnedTech = await getLearnedTech(user, techData);
    setLTech(learnedTech);
    Promise.all([getAllGoals(user), getAllTopics(user)])
      .then(([goals, topics]) => {
        const allTopics = topics;
        const allGoals = goals;
        setLTechGoals(goals);
        setLTechTopics(topics);
        const topicsAndGoals = allGoals.concat(allTopics);
        getResources(topicsAndGoals).then(setResources);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (isLoading) {
    <>
      <div className="top-container block center">
        <div className="hero-font">Goals</div>
        <div className="line" />
      </div>
      <div className="show-all_container">
        <div>
          <div className="show-all_header" />
          <Loading />
        </div>
      </div>
    </>;
  }
  return (
    <div className="view-all_container">
      <div className="top-container block center">
        <div className="hero-font">Goals</div>
        {/* <div className="line" /> */}
      </div>
      <div className="sub-nav-space-between">
        <div className="search-bar_container">
          <SearchBar array={lTechGoals} setArray={setFilteredGoals} />
        </div>
        <div>
          <ShowEditDelete handleEdit={handleEdit} edit={edit} />
        </div>
      </div>
      <div className="show-all_container">
        <div className="show-all_header">
          <div className="show-all_header-content">
            <ToggleButtons lTechGoals={lTechGoals} setFilteredGoals={setFilteredGoals} />
          </div>
          <div className="show-all_header-content">
            <div>
              <SortDropdown array={lTechGoals} setArray={setFilteredGoals} />
            </div>
          </div>
        </div>
        <div className="show-all-list-container">
          <GoalList
            goals={filteredGoals}
            onUpdate={loader}
            handleClose={handleClose}
            edit={edit}
            resources={resources}
          />
        </div>
      </div>
    </div>
  );
}
