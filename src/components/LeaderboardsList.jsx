import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardUserShape } from './LeaderboarItem';

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
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardUserShape)).isRequired,
};

export default LeaderboardsList;
