import { useDispatch, useSelector } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import { useEffect } from 'react';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((states) => states.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, []);

  return (
    <>
      <header className="forum-header">
        <h1 className="fs-3 fw-bold text-secondary-emphasis mb-0">Leaderboards</h1>
      </header>
      <LeaderboardsList leaderboards={leaderboards} />
    </>
  );
}

export default LeaderboardsPage;
