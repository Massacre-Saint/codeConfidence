import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsFillSignpost2Fill } from 'react-icons/bs';
import { useAuth } from '../utils/context/authContext';
import { Loading, Message } from '../components';
import NavBlock from '../components/navs/NavBlock';
import { getAllGoals } from '../utils/data/goals';
import { getAllTopics } from '../utils/data/topics';
import { getResources } from '../utils/data/resources';
import UserSettingButton from '../components/buttons/UserSettingButton';
import EmptyState from '../components/containers/EmptyState';
import GoalListContainer from '../components/containers/GoalListContainer';

function Home() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resources, setResources] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [, setFilteredTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDataAndSetState = async () => {
    const [a, b, c] = await Promise.all([getAllGoals(user),
      getAllTopics(user)]);
    setGoals(a);
    setFilteredGoals(a);
    setTopics(b);
    setFilteredTopics(b);
    getResources(c).then(setResources);
    setIsLoading(false);
  };
  useEffect(() => {
    getDataAndSetState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="home">
      <div className="grid-nav-container">
        <NavBlock />
      </div>
      <div className="recent-sidebar-container relative">
        <EmptyState noBookmarksOrResources />
      </div>
      <div className="sm-grid-container flex-row space-between">
        <Message />
        <UserSettingButton />
      </div>
      <div className="tech-view_container">
        <div className="flex-row space-between">
          <div className="fnt-secondary margin-btm">
            <IconContext.Provider value={{ size: '1.2em' }}>
              <BsFillSignpost2Fill className="margin-r-sm" />
            </IconContext.Provider>
            Viewing All Goals:
          </div>
        </div>
        <GoalListContainer
          topics={topics}
          goals={goals}
          resources={resources}
          setFilteredGoals={setFilteredGoals}
          setFilteredTopics={setFilteredTopics}
          filteredGoals={filteredGoals}
        />
      </div>
    </div>
  );
}
export default Home;
