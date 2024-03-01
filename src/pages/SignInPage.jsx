import SignInInput from "../components/SignInInput";

export default function SignInPage() {
  return (
    <main className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3">
          <h1>Sign In</h1>
          <SignInInput />
        </div>
      </div>
    </main>
  );
}
