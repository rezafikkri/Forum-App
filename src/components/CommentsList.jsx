import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({ comments }) {
  return (
    <article className="comments-list mt-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </article>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentsList;
