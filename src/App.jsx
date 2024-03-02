import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import Loading from "./components/Loading";

export default function App() {
  return (
    <>
      <Loading />
      <main>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </main>
    </>
  );
}
