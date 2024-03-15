import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({ comments, onUpVote, onDownVote }) {
  return (
    <article className="comments-list mt-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} onUpVote={onUpVote} onDownVote={onDownVote} />
      ))}
    </article>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default CommentsList;
