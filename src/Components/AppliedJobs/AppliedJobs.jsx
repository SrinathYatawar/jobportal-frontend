import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AppliedJobs = ({ onGoBack }) => {

  const { userId } = useParams();
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (userId) {
      // Define a function to fetch applied jobs data
      const fetchAppliedJobs = async () => {
        try {
          const host = 'https://jobportal-f9io.onrender.com/';
          const response = await axios.get(`${host}api/fetch/jobs/applied/${userId}`); // Replace with your server's URL
          setAppliedJobs(response.data.appliedJobs);
        } catch (error) {
          console.error('Error fetching applied jobs:', error);
        }
      };

      // Call the function to fetch the applied jobs data
      fetchAppliedJobs();
    }
  }, [userId]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-200 text-gray-700">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Applied Jobs</h2>
        <div
          className="overflow-auto"
          style={{ maxHeight: '400px' }}
        >
          <ul>
            {appliedJobs.map((job, index) => (
              <li
                key={index}
                className="mb-6 p-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      Title: {job.title}
                    </p>
                    <p>Category: {job.category}</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      Salary: {job.salary}
                    </p>
                    <p>Applied Date: {job.appliedDate}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onGoBack}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );

};

export default AppliedJobs;
