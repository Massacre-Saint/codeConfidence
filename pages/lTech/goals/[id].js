/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getGoals, getSingleGoal } from '../../../utils/data/goals';
import { Loading } from '../../../components';
import NavBlock from '../../../components/navs/NavBlock';
import LearnedTechHeader from '../../../components/headers/LearnedTechHeader';
import SingleGoalContainer from '../../../components/containers/SingleGoalContainer';
import { getSingleLearnedTech } from '../../../utils/data';
import { getTopics } from '../../../utils/data/topics';
import { getResources } from '../../../utils/data/resources';
import EmptyState from '../../../components/containers/EmptyState';

function DynamicSingleGoalPage() {
  const { user } = useAuth();
  const [goal, setGoal] = useState({});
  const [lTech, setLTech] = useState({});
  const [goals, setGoals] = useState([]);
  const [, setTopics] = useState([]);
  const [resources, setResources] = useState([]);
  const [goalTopics, setGoalTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const goalUUID = router.query.id;

  const getDataAndSetState = async () => {
    const goalData = await getSingleGoal(goalUUID);
    setGoal(goalData);
    const techData = await getSingleLearnedTech(
      goalData.learnedTech.id,
      user,
      goalData.learnedTech.tech,
    );
    setLTech(techData);
    const lTechTopics = await getTopics(user, techData);
    const lTechGoals = await getGoals(user, techData);
    setGoals(lTechGoals);
    setTopics(lTechTopics);
    getResources(goals).then(setResources);
    if (lTechTopics.length > 0) {
      const results = lTechTopics.filter((i) => i.goal !== null && i.goal.id === goalData.id);
      setGoalTopics(results);
    }
    setIsLoading(false);
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
    <div className="home">
      <div className="grid-nav-container">
        <NavBlock />
      </div>
      <div className="recent-sidebar-container relative">
        <EmptyState noBookmarksOrResources />
      </div>
      <div className="sm-grid-container">
        <div className="l-tech-nav">
          <LearnedTechHeader obj={lTech.tech} />
        </div>
      </div>
      <SingleGoalContainer
        goal={goal}
        setGoal={setGoal}
        topics={goalTopics}
        goals={goals}
        onUpdate={getDataAndSetState}
        lTech={lTech}
        resources={resources}
      />
    </div>
  );
}

export default DynamicSingleGoalPage;
