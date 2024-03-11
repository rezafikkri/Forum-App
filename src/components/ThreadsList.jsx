import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads, onUpVote }) {
  return (
    <article className="threads-list">
      {threads.map((thread) => <ThreadItem key={thread.id} {...thread} onUpVote={onUpVote} />)}
    </article>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpVote: PropTypes.func.isRequired,
};

export default ThreadsList;
