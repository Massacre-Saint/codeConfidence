import { useEffect, useState } from 'react';
import { LearnedTechStart, LearnedTechView } from '../components/containers';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech, getTech } from '../utils/data';
import { Loading, Message } from '../components';
import RecentsSidebar from '../components/containers/RecentsSidebar';
import NavBlock from '../components/navs/NavBlock';

function Home() {
  const { user } = useAuth();
  const [learnedTech, setLearnedTech] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentConditionalRoute] = useState('/');
  const loader = () => {
    getTech().then(async (array) => {
      const userTech = await getLearnedTech(user, array);
      setLearnedTech(userTech);
      setIsLoading(false);
    });
  };
  const handleConditionalRouting = (href) => {
    console.warn(href);
  };
  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentConditionalRoute]);

  if (isLoading) {
    return <Loading />;
  }

  if (learnedTech.length === 0) {
    return (
      <>
        <LearnedTechStart onUpdate={loader} />
      </>
    );
  }
  return (
    <div className="home">
      <div className="grid-nav-container">
        <NavBlock routeStateHandler={handleConditionalRouting} />
      </div>
      <div className="recent-sidebar-container">
        <RecentsSidebar />
      </div>
      <div className="sm-grid-container">
        <Message />
      </div>
      <LearnedTechView tech={learnedTech} />
    </div>
  );
}
export default Home;
