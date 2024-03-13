function ThreadCard() {
  return (
    <article className="thread-card">
      <div className="thread-body mb-4">
        <div className="thread-author mb-2">
          <img
            src="https://ui-avatars.com/api/?name=rezahahaha&background=random"
            alt="alt"
            width={28}
            className="me-2"
          />
          <span>Reza Fikkri</span>
        </div>
        <h2 className="fs-2 fw-semibold">How works and where found the class?</h2>
        <time>13 minutes ago</time>
        <p className="mt-2 mb-0 fs-5">Get started by including Bootstrap’s production-ready CSS and JavaScript via CDN without the need for any build steps. See it in practice with this Bootstrap CodePen demo. You can also include Popper and our JS separately. If you don’t plan to use dropdowns, popovers, or tooltips, save some kilobytes by not including Popper.</p>
      </div>
      <div className="thread-footer d-flex fw-light gap-3">
          <div className="me-4">
            <i className="bi bi-hash me-0"></i>
            <span>general</span>
          </div>

          <a href="#" className={'active'}>
            <i className={`bi bi-arrow-up-circle-fill`}></i>
            <span>1</span>
          </a>
          <a href="#" className={''}>
            <i className={`bi bi-arrow-down-circle`}></i>
            <span>0</span>
          </a>
      </div>
    </article>
  );
}

export default ThreadCard;
