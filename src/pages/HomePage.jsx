import ThreadsList from "../components/ThreadsList";

function HomePage() {

  return (
    <>
      <header className="forum-header">
        <div className="d-flex align-items-start">
          <h1 className="fs-2 fw-bold text-body-emphasis me-auto mb-0">Threads</h1>
          <a href="#" className="btn btn-primary ms-auto">Create Thread</a>
        </div>
        <div className="d-flex mt-3 align-items-center">
          <p className="me-auto mb-0">200 threads</p>
          <select name="categories" value="all" className="form-select ms-auto">
            <option>All Categories</option>
            <option>other</option>
          </select>
        </div>
      </header>
      <ThreadsList />
    </>
  );
}

export default HomePage;
