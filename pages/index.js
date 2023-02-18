import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { LearnedTechStart, LearnedTechView } from '../components/containers';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech, getTech } from '../utils/data';

function Home() {
  const { user } = useAuth();
  const [learnedTech, setLearnedTech] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTech().then((array) => {
      getLearnedTech(user, array).then(setLearnedTech);
    });
    setLoading(false);
  }, [user]);

  if (!learnedTech.length && loading) {
    return (
      <>
        <LearnedTechStart />
        <Spinner />
      </>
    );
  }
  return <LearnedTechView tech={learnedTech} />;
}

export default Home;
