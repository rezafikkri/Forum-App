import { Link } from 'react-router-dom';
import ThreadsList from '../components/ThreadsList';
import Alert from '../components/Alert';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersThreadsAndCategories } from '../states/shared/action';
import { asyncNeutralVoteThread, asyncUpVoteThread } from '../states/threads/action';

function HomePage() {
  const dispatch = useDispatch();
  const users = useSelector((states) => states.users);
  const threads = useSelector((states) => states.threads);
  const categories = useSelector((states) => states.categories);
  const authUser = useSelector((states) => states.authUser);
  const [voteThreadError, setVoteThreadError] = useState(null);

  function resetVoteThreadErrorState() {
    setVoteThreadError(null);
  }

  function handleUpVoteThread({ threadId, upVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteThreadError('You must be signed in to upvote!');
      return false;
    }
    
    // check, if signed in user not upvote yet
    if (!upVotesBy.includes(authUser.id)) {
      dispatch(asyncUpVoteThread(threadId));
    } else {
      dispatch(asyncNeutralVoteThread({ threadId, target: 'up-vote' }));
    }
  }

  useEffect(() => {
    dispatch(asyncPopulateUsersThreadsAndCategories());
  }, [dispatch]);

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <>
      <header className="forum-header">
        <div className="d-flex align-items-start">
          <h1 className="fs-2 fw-bold text-body-emphasis me-auto mb-0">Threads</h1>
          {authUser !== null && (
            <Link to="/create" className="btn btn-primary ms-auto">Create Thread</Link>
          )}
        </div>
        <div className="d-flex mt-3 align-items-start">
          <p className="me-auto mb-0">{threads.length} threads</p>
          <div className="threads-filter ms-auto input-group">
            <span className="input-group-text">Category</span>
            <select name="categories" className="form-select">
              {categories.values.map((category) => {
                return (<option key={category} value={category}>{category}</option>);
              })}
            </select>
          </div>
        </div>
      </header>
      <ThreadsList threads={threadsList} onUpVote={handleUpVoteThread} />
      {voteThreadError && (
        <div className="position-fixed bottom-0 end-0 p-5 pb-0 fixed-alert">
          <Alert message={voteThreadError} onClose={resetVoteThreadErrorState} type="info" />
        </div>
      )}
    </>
  );
}

export default HomePage;
