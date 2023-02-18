import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Loading, ViewAssociated } from '../../components';
import { useAuth } from '../../utils/context/authContext';
import { getSingleLearnedTech, getSingleTech } from '../../utils/data';

export default function LearnedTechViewAll() {
  const router = useRouter();
  const { user } = useAuth();
  const [lTech, setLTech] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(() => {
    getSingleTech(router.query.tech).then((obj) => {
      getSingleLearnedTech(router.query.id, user, obj).then((data) => {
        setLTech(data);
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
      <ViewAssociated obj={lTech} />
    </>
  );
}
