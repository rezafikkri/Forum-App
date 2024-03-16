import LeaderboardItem from './LeaderboarItem';
import PropTypes from 'prop-types';

function LeaderboardsList({ leaderboards }) {
  return (
    <article className="leaderboards-list">
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem key={leaderboard.user.id} {...leaderboard} rank={index + 1} />
      ))}
    </article>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LeaderboardsList;
