import { useEffect, useState } from 'react';
import { LearnedTechStart, LearnedTechView } from '../components/containers';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech, getTech } from '../utils/data';

function Home() {
  const { user } = useAuth();
  const [learnedTech, setLearnedTech] = useState([]);
  const loader = () => {
    getTech().then((array) => {
      getLearnedTech(user, array).then(setLearnedTech);
    });
  };
  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (!learnedTech.length) {
    return (
      <>
        <LearnedTechStart onUpdate={loader} />
      </>
    );
  }
  return <LearnedTechView tech={learnedTech} />;
}

export default Home;
