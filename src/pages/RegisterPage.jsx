import RegisterInput from "../components/RegisterInput";

export default function RegisterPage() {
  return (
    <main className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3">
          <h1>Register</h1>
          <RegisterInput />
        </div>
      </div>
    </main>
  );
}
