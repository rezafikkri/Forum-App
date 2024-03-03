import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";

export default function App() {
  const authUser = useSelector((states) => states.authUser);

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
