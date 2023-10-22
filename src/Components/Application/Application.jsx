import React, { useState } from 'react';

const Application = ({ isOpen, onClose, onApply, job }) => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);

  const handleApply = () => {
    // Perform any data validation here
    if (!name || !reason || !file) {
      alert('Please fill in all fields.');
    } else {
       const title = job.title
       const salary = job.salary
       const category = job.category
      onApply({title, salary, category });
    }
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'} bg-black bg-opacity-50 z-50`}>
      <div className="absolute inset-x-0 m-auto max-w-lg p-6 bg-white rounded shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {console.log(job)}
          <h2 className="text-2xl font-semibold mb-4">{job.title}</h2>
          <div className="mb-4">
            <p className="mb-2"><strong>Description:</strong></p>
            <p className="text-gray-600">{job.description}</p>
          </div>
          <div className="mb-4">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <p><strong>Posted At:</strong> {job.postedAt}</p>
            <p><strong>Deadline:</strong> {job.deadline}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
          </div>
        </div>
        <form>
          <div className="my-4">
            <label htmlFor="name" className="block">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="my-4">
            <label htmlFor="resume" className="block">Upload Resume:</label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="my-4">
            <label htmlFor="reason" className="block">Why do you want to join?</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="my-4">
            <button
              type="button"
              onClick={handleApply}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;
