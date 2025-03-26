import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    dispatch(signInStart());
    try {
      const response = await axios.post('http://localhost:3000/api/userService/auth/signin', { email, password });
      dispatch(signInSuccess(response.data));
      navigate('/'); // Navigate to home page on successful sign-in
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred');
        dispatch(signInFailure(error.response.data.message || 'An error occurred'));
      } else {
        setError('An error occurred');
        dispatch(signInFailure('An error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={handleSignIn} className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </div>
  );
}

export default SignIn;