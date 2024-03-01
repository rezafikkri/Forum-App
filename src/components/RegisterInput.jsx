import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

export default function RegisterInput() {
  const [name, handleNameChange, ] = useInput('');
  const [email, handleEmailChange, ] = useInput('');
  const [password, handlePasswordChange, ] = useInput('');

  return (
    <>
      <form>
        <div class="mb-3 mt-4">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name..."
            onChange={handleNameChange}
            value={name}
            id="name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
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
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="text-center text-body-secondary mt-2">Already have an account? <Link>Sign In</Link></p>
    </>
  );
}
