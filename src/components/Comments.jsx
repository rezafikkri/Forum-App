import CommentInput from './CommentInput';
import { useDispatch, useSelector } from 'react-redux';
import CommentsList from './CommentsList';
import { Link, useParams } from 'react-router-dom';
import { asyncCreateComment } from '../states/detailThread/action';
import { useState } from 'react';
import Alert from './Alert';

function Comments() {
  const { threadId } = useParams();
  const comments = useSelector((states) => states.detailThread.comments);
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);
  const [createCommentError, setCreateCommentError] = useState(null);

  function resetCreateCommentErrorState() {
    setCreateCommentError(null);
  }

  function handleCreateComment(content) {
    return dispatch(asyncCreateComment({ threadId, content }))
      .then()
      .catch((errorMessage) => {
        setCreateCommentError(errorMessage.replace('content', 'comment'));
      });
  }

  return (
    <section className="comments mt-5">
      <h3 className={`fs-5 position-relative d-inline-block`}>
        Comments
        <span className="position-absolute top-0 start-100 rounded-pill text-bg-secondary badge fw-normal">
          {comments.length}
        </span>
      </h3>
      {createCommentError && <Alert message={createCommentError} onClose={resetCreateCommentErrorState} />}
      {authUser === null ? (
        <p className="text-body-secondary">You must be <Link to="/signin">signed in</Link> to comment!</p>
      ) : (
        <CommentInput onCreateComment={handleCreateComment} />
      )}
      <CommentsList comments={comments} />
    </section>
  );
}

export default Comments;
