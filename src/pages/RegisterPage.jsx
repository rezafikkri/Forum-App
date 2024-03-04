import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import { useState } from 'react';
import Alert from '../components/Alert';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerError, setRegisterError] = useState(null);

  function handleRegister({ name, email, password }) {
    dispatch(asyncRegisterUser({ name, email, password }))
      .then(() => {
        navigate('/');
      }).catch((errorMessage) => {
        setRegisterError(errorMessage);
      });
  }

  function resetRegisterErrorState() {
    setRegisterError(null);
  }

  return (
    <main className="py-5">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3">
          <h1 className="mb-4">Register</h1>
          {registerError && <Alert message={registerError} onClose={resetRegisterErrorState} />}
          <RegisterInput onRegister={handleRegister} />
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
