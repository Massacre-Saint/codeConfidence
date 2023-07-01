/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { Loading, Message } from '../../../components';
import NavBlock from '../../../components/navs/NavBlock';
import EmptyState from '../../../components/containers/EmptyState';
import { getSingleTopic, getTopics } from '../../../utils/data/topics';
import { getSingleLearnedTech } from '../../../utils/data';
import SingleTopicContanier from '../../../components/containers/SingleTopicContanier';
import { getGoals, getSingleGoal } from '../../../utils/data/goals';
import { getResources } from '../../../utils/data/resources';

function DynamicSingleTopicPage() {
  const { user } = useAuth();
  const [topic, setTopic] = useState({});
  const [topics, setTopics] = useState([]);
  const [lTech, setLTech] = useState({});
  const [goal, setGoal] = useState(null);
  const [goals, setGoals] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const topicUUID = router.query.id;

  const getDataAndSetState = async () => {
    const topicData = await getSingleTopic(topicUUID);
    setTopic(topicData);
    if (topicData.goal) {
      const goalData = await getSingleGoal(topicData.goal.id);
      setGoal(goalData);
    } else setGoal(null);
    const techData = await getSingleLearnedTech(
      topicData.learnedTech.id,
      user,
      topicData.learnedTech.tech,
    );
    setLTech(techData);
    const lTechTopics = await getTopics(user, techData);
    const lTechGoals = await getGoals(user, techData);
    getResources(goals).then(setResources);
    setGoals(lTechGoals);
    setTopics(lTechTopics);
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
          <Message />
        </div>
      </div>
      <SingleTopicContanier
        topic={topic}
        topics={topics}
        goal={goal}
        goals={goals}
        setTopic={setTopic}
        setGoal={setGoal}
        lTech={lTech}
        resources={resources}
        onUpdate={getDataAndSetState}
      />
    </div>
  );
}

export default DynamicSingleTopicPage;
