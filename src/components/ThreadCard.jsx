import PropTypes from 'prop-types';
import SanitizeHTML from './SanitizeHTML';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';

function ThreadCard({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  onUpVote,
  onDownVote,
}) {
  const authUser = useSelector((states) => states.authUser);

  dayjs.extend(relativeTime);

  function isSignedInUserVoted(votesBy) {
    if (authUser !== null) return votesBy.includes(authUser.id);
    return false;
  }

  function handleUpVote(e) {
    e.preventDefault();

    onUpVote({ threadId: id, upVotesBy, downVotesBy });
  }

  function handleDownVote(e) {
    e.preventDefault();

    onDownVote({ threadId: id, downVotesBy, upVotesBy });
  }

  return (
    <article className="thread-card">
      <div className="thread-body mb-4">
        <div className="thread-author mb-2">
          <img
            src={owner.avatar}
            alt={owner.name}
            width={24}
            className="me-2"
          />
          <span>{owner.name}</span>
        </div>
        <h2 className="fs-3 fw-bold text-body mb-0">{title}</h2>
        <time>{dayjs().to(dayjs(createdAt))}</time>
        <SanitizeHTML html={body} className="mt-2 fs-5" />
      </div>
      <div className="thread-footer d-flex fw-light gap-3">
          <div className="me-4">
            <i className="bi bi-hash me-0"></i>
            <span>general</span>
          </div>

          <a href="#" onClick={handleUpVote} className={isSignedInUserVoted(upVotesBy) ? 'active' : ''}>
            <i className={`bi bi-arrow-up-circle${isSignedInUserVoted(upVotesBy) ? '-fill' : ''}`}></i>
            <span>{upVotesBy.length}</span>
          </a>
          <a href="#" onClick={handleDownVote} className={isSignedInUserVoted(downVotesBy) ? 'active' : ''}>
            <i className={`bi bi-arrow-down-circle${isSignedInUserVoted(downVotesBy) ? '-fill' : ''}`}></i>
            <span>{downVotesBy.length}</span>
          </a>
      </div>
    </article>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadCard;
