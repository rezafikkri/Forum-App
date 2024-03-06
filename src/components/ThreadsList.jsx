import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads }) {
  return (
    <article className="threads-list">
      {threads.map((thread) => <ThreadItem key={thread.id} {...thread} />)}
    </article>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object),
};

export default ThreadsList;
