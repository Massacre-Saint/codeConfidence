import React, { useEffect, useState } from 'react';
import { Loading } from '../components';
import ShowEditDelete from '../components/buttons/ShowEditDelete';
import TopicList from '../components/containers/TopicList';
import ToggleButtons from '../components/navs/ToggleButtons';
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
  const [isLoading, setIsLoading] = useState(true);
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
    const topicData = await getAllTopics(user, learnedTech);
    setLTechTopics(topicData);
    setFilteredTopics(topicData);
    setIsLoading(false);
  };

  // const getData = useCallback(() => {
  //   getTech().then((techArray) => {
  //     getLearnedTech(user, techArray).then((lTechArray) => {
  //       setLTech(lTechArray);
  //       getGoals(user, lTechArray).then(setLTechGoals);
  //       getTopics(user, lTechArray).then(setLTechTopics);
  //       setIsLoading(false);
  //     });
  //   });
  // }, [user]);

  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (isLoading) {
    <>
      <div className="hero-font-container">
        <div className="hero-font">Topics</div>
        <div className="line" />
      </div>
      <div className="show-all_container">
        <div>
          <div className="show-all_header">
            <div>
              Topics
            </div>
          </div>
          <Loading />
        </div>
      </div>
    </>;
  }
  return (
    <div className="view-all_container">
      <div className="hero-font-container">
        <div className="hero-font">Topics</div>
        {/* <div className="line" /> */}
      </div>
      <div className="sub-nav-space-between">
        <div className="search-bar_container">
          <SearchBar lTechTopics={lTechTopics} setFilteredTopics={setFilteredTopics} />
        </div>
        <div>
          <ShowEditDelete handleEdit={handleEdit} edit={edit} />
        </div>
      </div>
      <div className="show-all_container">
        <div className="show-all_header">
          <div className="show-all_header-content">
            <ToggleButtons lTechTopics={lTechTopics} setFilteredTopics={setFilteredTopics} />
          </div>
          <div className="show-all_header-content">
            <div>
              Sort
            </div>
            <div>
              Goals
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
