import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!firstname || !lastname || !fullname || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/userService/auth/signup', {
        firstname,
        lastname,
        fullname,
        email,
        password,
      });
      toast.success('Signup successful');
      navigate('/sign-in'); // Navigate to sign-in page on successful sign-up
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error('Signup failed: ' + error.response.data.message);
      } else {
        toast.error('Signup failed: An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
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
      <button onClick={handleSignUp} className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </div>
  );
}

export default SignUp;