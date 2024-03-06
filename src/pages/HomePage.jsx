import { Link } from "react-router-dom";
import ThreadsList from "../components/ThreadsList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateUsersThreadsAndCategories } from "../states/shared/action";

function HomePage() {
  const dispatch = useDispatch();
  const users = useSelector((states) => states.users);
  const threads = useSelector((states) => states.threads);
  const categories = useSelector((states) => states.categories);

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
          <Link to="/create" className="btn btn-primary ms-auto">Create Thread</Link>
        </div>
        <div className="d-flex mt-3 align-items-center">
          <p className="me-auto mb-0">{threads.length} threads</p>
          <select name="categories" className="form-select ms-auto">
            {categories.values.map((category) => {
              return (<option key={category} value={category}>{category}</option>);
            })}
          </select>
        </div>
      </header>
      <ThreadsList threads={threadsList} />
    </>
  );
}

export default HomePage;