import { useParams } from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveDetailThread } from '../states/detailThread/action';
import Loading from '../components/Loading';

function DetailThreadPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const detailThread = useSelector((states) => states.detailThread);

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(threadId));
  }, []);

  if (!detailThread) return null;

  return (
    <>
      <header className="forum-header">
        <h1 className="fs-4 fw-bold text-secondary-emphasis mb-0">Detail Thread</h1>
      </header>
      <ThreadCard detailThread={detailThread}/>
    </>
  );
}

export default DetailThreadPage;
