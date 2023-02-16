import { useEffect, useState } from 'react';
import { LearnedTechStart, LearnedTechView } from '../components/containers';
import { useAuth } from '../utils/context/authContext';
import { getLearnedTech } from '../utils/data';

function Home() {
  const { user } = useAuth();
  const [learnedTech, setLearnedTech] = useState([]);

  useEffect(() => {
    getLearnedTech(user).then(setLearnedTech);
  }, [user]);

  if (!learnedTech.length) {
    return (
      <LearnedTechStart />
    );
  }
  return <LearnedTechView />;
}

export default Home;
