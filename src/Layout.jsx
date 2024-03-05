import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import PropTypes from 'prop-types';

function Layout({ onSignOut }) {
  return (
    <>
      <header>
        <Navigation onSignOut={onSignOut} />
      </header>
      <main>
        <div className="row justify-content-center">
          <div className="col-10 col-md-8">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

Layout.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default Layout;
