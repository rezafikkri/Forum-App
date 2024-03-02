import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleRegister({ name, email, password }) {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/signin');
  }

  return (
    <main className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3">
          <h1>Register</h1>
          <RegisterInput onRegister={handleRegister} />
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
