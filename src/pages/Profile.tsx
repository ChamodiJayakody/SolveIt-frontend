import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';

interface FormData {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
}

const Profile = () => {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const [formData, setFormData] = useState<FormData>({
    firstname: currentUser?.firstname || '',
    lastname: currentUser?.lastname || '',
    fullname: currentUser?.fullname || '',
    email: currentUser?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
    }
  }, [currentUser, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    dispatch(updateStart());
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }
      const response = await axios.put(`http://localhost:3000/api/userService/user/update/${currentUser._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(updateSuccess(response.data));
      alert('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile');
      dispatch(updateFailure('Failed to update profile'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-2 p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">First Name</label>
        <input name="firstname" value={formData.firstname} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Last Name</label>
        <input name="lastname" value={formData.lastname} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Full Name</label>
        <input name="fullname" value={formData.fullname} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default Profile;