import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navigation({ onSignOut }) {
  const authUser = useSelector((states) => states.authUser);

  return (
    <div className="row justify-content-center">
      <div className="col-10">
        <nav className="navbar navbar-expand-sm">
          <a className="navbar-brand" href="#">
            <img src="/logo.svg" alt="Forum App" width="30"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Threads</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Leaderboards</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
              <li className="nav-item dropdown">
                {(authUser === null) ? (
                  <Link to="/signin" className="nav-link">Sign In</Link>
                ) : (
                  <>
                    <a
                      className="nav-link dropdown-toggle py-1 px-0 profile"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={authUser.avatar} width="30"/>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end mt-2">
                      <li><a onClick={onSignOut} className="dropdown-item" href="#">Logout</a></li> 
                    </ul>
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
