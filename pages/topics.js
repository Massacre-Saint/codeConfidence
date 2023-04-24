import React, { useEffect, useState } from 'react';
import ShowEditDelete from '../components/buttons/ShowEditDelete';
import TopicList from '../components/containers/TopicList';
import FilterModal from '../components/modals/FilterModal';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech, getTech } from '../utils/data';
import { getAllGoals } from '../utils/data/goals';
import { getAllTopics } from '../utils/data/topics';

export default function Topics() {
  const { user } = useAuth();
  const [, setLTech] = useState({});
  const [lTechGoals, setLTechGoals] = useState([]);
  const [lTechTopics, setLTechTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [, setFilteredGoals] = useState([]);
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
    const goalData = await getAllGoals(user, learnedTech);
    setLTechGoals(goalData);
    setFilteredGoals(goalData);
    const topicData = await getAllTopics(user, learnedTech);
    setLTechTopics(topicData);
    setFilteredTopics(topicData);
  };

  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="view-all_container">
      <div className="hero-font-container">
        <div className="hero-font">Topics</div>
      </div>
      <div className="sub-nav-space-between">
        <div>
          <ShowEditDelete handleEdit={handleEdit} edit={edit} />
        </div>
      </div>
      <div className="show-all_container">
        <div className="show-all_header">
          <div className="search-bar_container">
            <SearchBar array={lTechTopics} setArray={setFilteredTopics} />
          </div>
          <div className="show-all_header-content">
            <div>
              <FilterModal
                goals={lTechGoals}
                topics={lTechTopics}
                setFilteredGoals={setFilteredGoals}
                setFilteredTopics={setFilteredTopics}
              />
            </div>
          </div>
        </div>
        <div className="show-all-list-container">
          <TopicList
            topics={filteredTopics}
            goals={lTechGoals}
            onUpdate={loader}
            handleClose={handleClose}
            edit={edit}
          />
        </div>
      </div>
    </div>
  );
}
