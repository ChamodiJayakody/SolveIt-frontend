import { Link } from 'react-router-dom';
import { FaHome, FaTicketAlt, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar bg-white text-black w-52 h-screen p-4 shadow-md">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center p-2 rounded hover:bg-gray-200" title="Home">
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li>
          <Link to="/tickets" className="flex items-center p-2 rounded hover:bg-gray-200" title="Tickets">
            <FaTicketAlt className="mr-2" /> Tickets
          </Link>
        </li>
        <li>
          <Link to="/create-ticket" className="flex items-center p-2 rounded hover:bg-gray-200" title="Create Ticket">
            <FaPlus className="mr-2" /> Create Ticket
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;