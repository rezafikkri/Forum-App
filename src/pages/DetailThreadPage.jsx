import { useParams } from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';

function DetailThreadPage() {
  const { threadId } = useParams();

  return (
    <>
      <header className="forum-header">
        <h1 className="fs-3 fw-medium text-body-secondary mb-0">Detail Thread</h1>
      </header>
      <ThreadCard />
    </>
  );
}

export default DetailThreadPage;
