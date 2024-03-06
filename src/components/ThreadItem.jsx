function ThreadItem() {
  return (
    <>
      <article className="thread-item mb-1">
        <div className="thread-body mb-3">
          <div className="thread-author mb-1">
            <img
              src="https://ui-avatars.com/api/?name=diantest&background=random"
              alt=""
              width={15}
              className="me-1"
            />
            <span>Reza Fikkri</span>
          </div>
          <h2 className="fs-5 mb-0">How works and where found the class</h2>
          <p className="mb-0">Input groups include support for custom selects and custom file inputs. Browser default versi...</p>
        </div>
        <div className="thread-footer d-flex fw-light gap-3">
          <div>
            <i className="bi bi-hash me-0"></i>
            <span>Technology</span>
          </div>
          <div className="me-4">
            <i className="bi bi-clock"></i>
            <time>10 minutes ago</time>
          </div>

          <a href="#" className="active">
            <i className="bi bi-arrow-up-circle-fill"></i>
            <span>10</span>
          </a>
          <a href="#">
            <i className="bi bi-arrow-down-circle"></i>
            <span>0</span>
          </a>

          <div>
            <i className="bi bi-chat"></i>
            <span>20</span>
          </div>
        </div>
      </article>
    </>
  );
}

export default ThreadItem;
