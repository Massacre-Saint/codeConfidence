/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { LearnedTechHub, Loading } from '../../components';
import { useAuth } from '../../utils/context/authContext';
import { getSingleLearnedTech, getSingleTech } from '../../utils/data';
import { getBookmarks } from '../../utils/data/bookmarks';
import { getAllGoals, getGoals } from '../../utils/data/goals';
import { getResources } from '../../utils/data/resources';
import { getAllTopics, getTopics } from '../../utils/data/topics';

export default function LearnedTechViewAll() {
  const router = useRouter();
  const { user } = useAuth();
  const [lTech, setLTech] = useState({});
  const [lTechGoals, setLTechGoals] = useState([]);
  const [lTechTopics, setLTechTopics] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(() => {
    getSingleTech(router.query.tech).then((obj) => {
      getSingleLearnedTech(router.query.id, user, obj).then((data) => {
        setLTech(data);
        Promise.all([getAllGoals(user), getAllTopics(user)])
          .then(([goals, topics]) => {
            const allTopics = topics;
            const allGoals = goals;
            const topicsAndGoals = allGoals.concat(allTopics);
            getResources(topicsAndGoals).then(setResources);
          });
        getGoals(user, data).then(setLTechGoals);
        getTopics(user, data).then(setLTechTopics);
        getBookmarks().then(setBookmarks);
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
      <LearnedTechHub
        lTech={lTech}
        topics={lTechTopics}
        goals={lTechGoals}
        bookmarks={bookmarks}
        onUpdate={getData}
        resources={resources}
      />
    </>
  );
}
