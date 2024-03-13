import PropTypes from 'prop-types';
import SanitizeHTML from './SanitizeHTML';

function ThreadCard({ detailThread }) {
  return (
    <article className="thread-card">
      <div className="thread-body mb-4">
        <div className="thread-author mb-2">
          <img
            src={detailThread.owner.avatar}
            alt={detailThread.owner.name}
            width={24}
            className="me-2"
          />
          <span>{detailThread.owner.name}</span>
        </div>
        <h2 className="fs-3 fw-bold text-body mb-0">{detailThread.title}</h2>
        <time>13 minutes ago</time>
        <SanitizeHTML html={detailThread.body} className="mt-2 fs-5" />
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

ThreadCard.propTypes = {
  detailThread: PropTypes.object.isRequired,
};

export default ThreadCard;
