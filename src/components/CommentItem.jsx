import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SanitizeHTML from './SanitizeHTML';
import { useSelector } from 'react-redux';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
}) {
  const authUser = useSelector((states) => states.authUser);

  dayjs.extend(relativeTime);

  function isSignedInUserVoted(votesBy) {
    if (authUser !== null) return votesBy.includes(authUser.id);
    return false;
  }

  return (
    <article className="comment-item mb-1">
      <div className="comment-body mb-3">
        <div className="comment-author d-flex align-items-center">
          <img
            src={owner.avatar}
            alt={owner.name}
            width="20"
            className="me-2"
          />
          <div className="lh-1">
            <span className="d-block">{owner.name}</span>  
            <time className="text-secondary">{dayjs().to(dayjs(createdAt))}</time>
          </div>
        </div>
        <SanitizeHTML html={content} className="mt-2" />
      </div>
      <div className="comment-footer d-flex fw-light gap-3 row-gap-1 flex-wrap">
        <a href="#" className={isSignedInUserVoted(upVotesBy) ? 'active' : ''}>
          <i className={`bi bi-arrow-up-circle${isSignedInUserVoted(upVotesBy) ? '-fill' : ''}`}></i>
          <span>{upVotesBy.length}</span>
        </a>
        <a href="#" className={isSignedInUserVoted(downVotesBy) ? 'active' : ''}>
          <i className={`bi bi-arrow-down-circle${isSignedInUserVoted(downVotesBy) ? '-fill' : ''}`}></i>
          <span>{downVotesBy.length}</span>
        </a>
      </div>
    </article>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};

export default CommentItem;
