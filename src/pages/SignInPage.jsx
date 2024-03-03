import { useDispatch } from "react-redux";
import SignInInput from "../components/SignInInput";
import { asyncSetAuthUser } from "../states/authUser/action";
import { useState } from "react";
import Alert from "../components/Alert";

export default function SignInPage() {
  const dispatch = useDispatch();

  const [ signInError, setSignInError ] = useState(null);

  function handleSignIn({ email, password }) {
    dispatch(asyncSetAuthUser({ email, password }))
      .catch((errorMessage) => {
        setSignInError(errorMessage);
      });
  }

  function resetSignInErrorState() {
    setSignInError(null);
  }

  return (
    <main className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3">
          <h1>Sign In</h1>
          <p className="mb-4">Hi, welcome</p>
          {signInError && <Alert message={signInError} onClose={resetSignInErrorState} />}
          <SignInInput onSignIn={handleSignIn} />
        </div>
      </div>
    </main>
  );
}
