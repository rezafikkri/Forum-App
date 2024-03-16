import { useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import { asyncCreateThread } from '../states/threads/action';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const [createThreadError, setCreateThreadError] = useState(null);
  const navigate = useNavigate();

  function handleCreateThread({ title, category, body }) {
    dispatch(asyncCreateThread({ title, category, body }))
      .then(() => {
        navigate('/');
      })
      .catch((errorMessage) => {
        setCreateThreadError(errorMessage);
      });
  }

  function resetCreateThreadErrorState() {
    setCreateThreadError(null);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-md-10">
        <header className="forum-header">
          <h1 className="fs-2 fw-bold text-body-emphasis me-auto mb-4">Create Thread</h1>
        </header>
        {createThreadError && <Alert message={createThreadError} onClose={resetCreateThreadErrorState} />}
        <ThreadInput onCreateThread={handleCreateThread} />
      </div>
    </div>
  );
}

export default CreateThreadPage;
