import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { stripHtml } from '../utils';
import { useSelector } from 'react-redux';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const authUser = useSelector((states) => states.authUser);

  const stripedBody = stripHtml(body);
  const bodyCountChr = stripedBody.length;
  const dots = bodyCountChr <= 80 ? "" : "...";

  dayjs.extend(relativeTime);

  function isSignedInUserVoted(votesBy) {
    if (authUser !== null) return votesBy.includes(authUser.id);
    return false;
  }

  return (
    <>
      <article className="thread-item mb-1">
        <div className="thread-body mb-3">
          <div className="thread-author mb-1">
            <img
              src={user.avatar}
              alt=""
              width={15}
              className="me-1"
            />
            <span>{user.name}</span>
          </div>
          <h2 className="fs-5 mb-0">{title}</h2>
          <p className="mb-0">{stripedBody.substring(0, 80) + dots}</p>
        </div>
        <div className="thread-footer d-flex fw-light gap-3">
          <div>
            <i className="bi bi-hash me-0"></i>
            <span>{category}</span>
          </div>
          <div className="me-4">
            <i className="bi bi-clock"></i>
            <time>{dayjs().to(dayjs(createdAt))}</time>
          </div>

          <a href="#" className={isSignedInUserVoted(upVotesBy) ? 'active' : ''}>
            <i className={`bi bi-arrow-up-circle${isSignedInUserVoted(upVotesBy) ? '-fill' : ''}`}></i>
            <span>{upVotesBy.length}</span>
          </a>
          <a href="#" className={isSignedInUserVoted(downVotesBy) ? 'active' : ''}>
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

export default ThreadItem;
