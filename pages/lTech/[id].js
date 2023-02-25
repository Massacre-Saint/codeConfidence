import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { LearnedTechHub, Loading } from '../../components';
import { useAuth } from '../../utils/context/authContext';
import { getSingleLearnedTech, getSingleTech } from '../../utils/data';
import { getGoals } from '../../utils/data/goals';
import { getTopics } from '../../utils/data/topics';

export default function LearnedTechViewAll() {
  const router = useRouter();
  const { user } = useAuth();
  const [lTech, setLTech] = useState({});
  const [lTechGoals, setLTechGoals] = useState([]);
  const [lTechTopics, setLTechTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(() => {
    getSingleTech(router.query.tech).then((obj) => {
      getSingleLearnedTech(router.query.id, user, obj).then((data) => {
        setLTech(data);
        getGoals(user, data).then(setLTechGoals);
        getTopics(user, data).then(setLTechTopics);
        setIsLoading(false);
      });
    });
  }, [router.query.tech, router.query.id, user]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <LearnedTechHub lTech={lTech} topics={lTechTopics} goals={lTechGoals} onUpdate={getData} />
    </>
  );
}
