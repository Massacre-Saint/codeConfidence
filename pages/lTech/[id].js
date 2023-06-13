/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../components';
import LearnedTechDashboard from '../../components/containers/LearnedTechDashboard';
import LearnedTechHeader from '../../components/headers/LearnedTechHeader';
import NavBlock from '../../components/navs/NavBlock';
import { useAuth } from '../../utils/context/authContext';
import { getSingleLearnedTech, getSingleTech } from '../../utils/data';
import { getAllGoals, getGoals } from '../../utils/data/goals';
import { getResources } from '../../utils/data/resources';
import { getAllTopics, getTopics } from '../../utils/data/topics';
import EmptyState from '../../components/containers/EmptyState';
import UserSettingButton from '../../components/buttons/UserSettingButton';

export default function LearnedTechViewAll() {
  const router = useRouter();
  const { user } = useAuth();
  const [lTech, setLTech] = useState({});
  const [lTechGoals, setLTechGoals] = useState([]);
  const [lTechTopics, setLTechTopics] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDataAndSetState = () => {
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
        setIsLoading(false);
      });
    });
  };
  useEffect(() => {
    getDataAndSetState();
  }, [user]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <div className="home">
        <div className="grid-nav-container">
          <NavBlock />
        </div>
        <div className="recent-sidebar-container relative">
          <EmptyState noBookmarksOrResources />
        </div>
        <div className="sm-grid-container flex-row space-between">
          <div className="l-tech-nav">
            <LearnedTechHeader obj={lTech.tech} />
          </div>
          <UserSettingButton />
        </div>
        <LearnedTechDashboard
          lTech={lTech}
          topics={lTechTopics}
          goals={lTechGoals}
          onUpdate={getDataAndSetState}
          resources={resources}
        />
      </div>
    </>
  );
}
