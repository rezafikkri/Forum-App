import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { stripHtml } from '../utils';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
  onUpVote,
  onDownVote,
}) {
  const authUser = useSelector((states) => states.authUser);
  const navigate = useNavigate();

  const stripedBody = stripHtml(body);
  const bodyCountChr = stripedBody.length;
  const dots = bodyCountChr <= 80 ? "" : "...";

  dayjs.extend(relativeTime);

  function isSignedInUserVoted(votesBy) {
    if (authUser !== null) return votesBy.includes(authUser.id);
    return false;
  }

  function handleUpVote(e) {
    e.stopPropagation();
    e.preventDefault();

    onUpVote({ threadId: id, upVotesBy, downVotesBy });
  }

  function handleDownVote(e) {
    e.stopPropagation();
    e.preventDefault();

    onDownVote({ threadId: id, downVotesBy, upVotesBy });
  }

  return (
    <>
      <article className="thread-item mb-1">
        <Link to={`/threads/${id}`}>
        <div className="thread-body mb-3">
          <div className="thread-author mb-1">
            <img
              src={owner.avatar}
              alt={owner.name}
              width={15}
              className="me-1"
            />
            <span>{owner.name}</span>
          </div>
          <h2 className="fs-5 mb-0 text-body">{title}</h2>
          <p className="mb-0">{stripedBody.substring(0, 80) + dots}</p>
        </div>
        </Link>
        <div className="thread-footer d-flex fw-light gap-3">
          <div>
            <i className="bi bi-hash me-0"></i>
            <span>{category}</span>
          </div>
          <div className="me-4">
            <i className="bi bi-clock"></i>
            <time>{dayjs().to(dayjs(createdAt))}</time>
          </div>

          <a href="#" onClick={handleUpVote} className={isSignedInUserVoted(upVotesBy) ? 'active' : ''}>
            <i className={`bi bi-arrow-up-circle${isSignedInUserVoted(upVotesBy) ? '-fill' : ''}`}></i>
            <span>{upVotesBy.length}</span>
          </a>
          <a href="#" onClick={handleDownVote} className={isSignedInUserVoted(downVotesBy) ? 'active' : ''}>
            <i className={`bi bi-arrow-down-circle${isSignedInUserVoted(downVotesBy) ? '-fill' : ''}`}></i>
            <span>{downVotesBy.length}</span>
          </a>

          <div>
            <i className="bi bi-chat"></i>
            <span>{totalComments}</span>
          </div>
        </div>
      </article>
    </>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadItem;
