import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    type: '',
    department: '',
    reportedby: '',
    assignedto: '',
    attachments: '',
    tags: '',
    comments: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3001/api/issueService/create-issue', formData);
      alert('Ticket created successfully');
      navigate('/tickets'); // Navigate to tickets page on successful issue creation
    } catch (error) {
      setError('Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-2 p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Create Ticket</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select name="status" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Priority</label>
        <select name="priority" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Type</label>
        <select name="type" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Type</option>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="task">Task</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Department</label>
        <input name="department" placeholder="Department" onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Reported By</label>
        <input name="reportedby" placeholder="Reported By" onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Assigned To</label>
        <input name="assignedto" placeholder="Assigned To" onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Attachments</label>
        <input name="attachments" placeholder="Attachments" onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Tags</label>
        <input name="tags" placeholder="Tags" onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Comments</label>
        <textarea name="comments" placeholder="Comments" onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
        {loading ? 'Creating...' : 'Create Ticket'}
      </button>
    </form>
  );
};

export default TicketForm;