import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';

export default function SignInInput() {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  return (
    <>
      <form>
        <div class="mb-3 mt-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Your email..."
            onChange={handleEmailChange}
            value={email}
            id="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password..."
            onChange={handlePasswordChange}
            value={password}
            id="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
      <p className="text-center text-body-secondary mt-2">Don't have an account? <Link to="/register">Register</Link></p>
    </>
  );
}
