import { useParams } from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
} from '../states/detailThread/action';
import Alert from '../components/Alert';

function DetailThreadPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const detailThread = useSelector((states) => states.detailThread);
  const [voteDetailThreadError, setVoteDetailThreadError] = useState(null);
  const authUser = useSelector((states) => states.authUser);

  function resetVoteDetailThreadErrorState() {
    setVoteDetailThreadError(null);
  }

  function handleUpVoteDetailThread({ threadId, upVotesBy, downVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteDetailThreadError('You must be signed in to upvote!');
      return false;
    }
    
    // check, if signed in user not upvote yet
    if (!upVotesBy.includes(authUser.id)) {
      // check, if signed in user has downvoted
      let isDownVoted = false;
      if (downVotesBy.includes(authUser.id)) isDownVoted = true;

      dispatch(asyncUpVoteDetailThread({ threadId, isDownVoted }));
    } else {
      dispatch(asyncNeutralVoteDetailThread({ threadId, target: 'up-vote' }));
    }
  }

  function handleDownVoteDetailThread({ threadId, downVotesBy, upVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteDetailThreadError('You must be signed in to downvote!');
      return false;
    }
    
    // check, if signed in user not downvote yet
    if (!downVotesBy.includes(authUser.id)) {
      // check, if signed in user has upvoted
      let isUpVoted = false;
      if (upVotesBy.includes(authUser.id)) isUpVoted = true;

      dispatch(asyncDownVoteDetailThread({ threadId, isUpVoted }));
    } else {
      dispatch(asyncNeutralVoteDetailThread({ threadId, target: 'down-vote' }));
    }
  }

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(threadId));
  }, []);

  if (!detailThread) return null;

  return (
    <>
      <header className="forum-header">
        <h1 className="fs-4 fw-bold text-secondary-emphasis mb-0">Detail Thread</h1>
      </header>
      <ThreadCard
        {...detailThread}
        onUpVote={handleUpVoteDetailThread}
        onDownVote={handleDownVoteDetailThread}
      />
      {voteDetailThreadError && (
        <div className="position-fixed bottom-0 end-0 p-5 pb-0 fixed-alert">
          <Alert message={voteDetailThreadError} onClose={resetVoteDetailThreadErrorState} type="info" />
        </div>
      )}
    </>
  );
}

export default DetailThreadPage;
