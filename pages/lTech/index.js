import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LearnedTechCreate, Loading } from '../../components';
import { useAuth } from '../../utils/context/authContext';
import { getLearnedTech } from '../../utils/data';
import { getUnlearnedTech } from '../../utils/data/tech';

export default function AddLearnedTech() {
  const [tech, setTech] = useState([]);
  const [, setLearnedTech] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const loader = async () => {
    const techData = await getUnlearnedTech(user);
    setTech(techData);
    const learnedTechData = await getLearnedTech(user, techData);
    setLearnedTech(learnedTechData);
    setLoading(false);
  };

  const handleSubmit = () => {
    router.push('/');
  };

  useEffect(() => {
    loader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <LearnedTechCreate onUpdate={handleSubmit} tech={tech} />
    </>
  );
}
