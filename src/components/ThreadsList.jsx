import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads, onUpVote, onDownVote }) {
  return (
    <article className="threads-list">
      {threads.map((thread) => 
        <ThreadItem key={thread.id} {...thread} onUpVote={onUpVote} onDownVote={onDownVote} />
      )}
    </article>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadsList;
