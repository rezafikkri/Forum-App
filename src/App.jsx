import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import { asyncPreloadProccess } from './states/isPreload/action';

export default function App() {
  const {
    authUser,
    isPreload,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProccess());
  }, [dispatch]);

  if (isPreload) return <Loading />;

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <main>
        <Routes>
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}
