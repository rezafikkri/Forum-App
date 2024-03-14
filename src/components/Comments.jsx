import CommentInput from './CommentInput';
import { useSelector } from 'react-redux';
import CommentsList from './CommentsList';

function Comments() {
  const comments = useSelector((states) => states.detailThread.comments);

  return (
    <section className="comments mt-5">
      <h3 className={`fs-5 position-relative d-inline-block`}>
        Comments
        <span className="position-absolute top-0 start-100 rounded-pill text-bg-secondary badge fw-normal">
          {comments.length}
        </span>
      </h3>
      <CommentInput />
      <CommentsList comments={comments} />
    </section>
  );
}

export default Comments;
