import { useEffect, useState } from 'react';
import { LearnedTechStart, LearnedTechView } from '../components/containers';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech, getTech } from '../utils/data';
import { Loading } from '../components';

function Home() {
  const { user } = useAuth();
  const [learnedTech, setLearnedTech] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loader = () => {
    getTech().then((array) => {
      getLearnedTech(user, array).then(setLearnedTech);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (!learnedTech && !learnedTech.length) {
    return (
      <>
        <LearnedTechStart onUpdate={loader} />
      </>
    );
  }
  return <LearnedTechView tech={learnedTech} />;
}

export default Home;
