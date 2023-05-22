/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleGoal } from '../../../utils/data/goals';
import { Loading } from '../../../components';
import NavBlock from '../../../components/navs/NavBlock';
import LearnedTechHeader from '../../../components/headers/LearnedTechHeader';

function DynamicSingleGoalPage() {
  const { user } = useAuth();
  const [goal, setGoal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const goalUUID = router.query.id;

  const getDataAndSetState = () => {
    getSingleGoal(goalUUID).then((obj) => {
      setGoal(obj);
      setIsLoading(false);
    });
    console.warn(goal);
  };

  useEffect(() => {
    getDataAndSetState();
  }, [user, isLoading]);

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
      <div className="recent-sidebar-container" />
      <div className="sm-grid-container">
        <div className="l-tech-nav">
          <LearnedTechHeader obj={goal.learnedTech.tech} />
        </div>
      </div>
    </div>
  );
}

export default DynamicSingleGoalPage;
