import { useEffect, useState } from 'react';
import { LearnedTechStart, LearnedTechView } from '../components/containers';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech, getTech } from '../utils/data';
import { Loading, Message } from '../components';
import RecentsSidebar from '../components/containers/RecentsSidebar';
import NavBlock from '../components/navs/NavBlock';
import { getAllGoals } from '../utils/data/goals';
import { getAllTopics } from '../utils/data/topics';
import { getResources } from '../utils/data/resources';
import UserSettingButton from '../components/buttons/UserSettingButton';

function Home() {
  const { user } = useAuth();
  const [learnedTech, setLearnedTech] = useState([]);
  const [goals, setGoals] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentConditionalRoute] = useState('/');

  const getDataAndSetState = async () => {
    const array = await getTech();
    const userTech = await getLearnedTech(user, array);
    const [a, b, c] = await Promise.all([getAllGoals(user),
      getAllTopics(user),
      getResources(learnedTech)]);
    setLearnedTech(userTech);
    setGoals(a);
    setTopics(b);
    setResources(c);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataAndSetState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentConditionalRoute]);

  if (isLoading) {
    return <Loading />;
  }

  if (learnedTech.length === 0) {
    return (
      <>
        <LearnedTechStart onUpdate={getDataAndSetState} />
      </>
    );
  }
  return (
    <div className="home">
      <div className="grid-nav-container">
        <NavBlock />
      </div>
      <div className="recent-sidebar-container">
        <RecentsSidebar
          goals={goals}
          topics={topics}
          resources={resources}
        />
      </div>
      <div className="sm-grid-container flex-row space-between">
        <Message />
        <UserSettingButton />
      </div>
      <LearnedTechView tech={learnedTech} arrays={[goals, topics]} />
    </div>
  );
}
export default Home;
