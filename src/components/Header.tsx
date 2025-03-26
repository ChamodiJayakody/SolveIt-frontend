import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSignOut = () => {
    dispatch(signoutSuccess());
    navigate('/sign-in');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="bg-white text-black p-4 shadow-md z-10">
      <nav className="flex justify-between items-center">
        <div className="text-3xl font-semibold text-teal-500">Solve</div>
        <div className="text-3xl font-bold text-gray-700">IT</div>
        <div className="flex-1 flex justify-center">
          <Link to="/" className="hover:text-teal-500 font-medium text-xl">Home</Link>
        </div>
        <div className="space-x-4 flex items-center">
          {!currentUser && <Link to="/sign-in" className="hover:text-teal-500 font-medium text-xl">Sign In</Link>}
          {!currentUser && <Link to="/sign-up" className="hover:text-teal-500 font-medium text-xl">Sign Up</Link>}
          {currentUser && (
            <div className="relative">
              {currentUser.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              ) : (
                <FaUserCircle size={40} className="cursor-pointer" onClick={toggleDropdown} />
              )}
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">{currentUser.fullname}</p>
                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                  <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;