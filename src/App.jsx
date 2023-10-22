import React, { useState, useEffect } from 'react';
import Login from '../src/Components/Header/Register/Login';
import Signup from '../src/Components/Header/Register/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import axios from 'axios';
import AppliedJobs from './Components/AppliedJobs/AppliedJobs';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [jobs, setJobs] = useState([]);

  // Function to fetch job postings
  const fetchJobs = async () => {
    try {
      const host = 'https://jobportal-f9io.onrender.com/';
      const response = await axios.get(`${host}api/fetch/jobs`); // Replace with your API URL
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Call the fetchJobs function when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="w-full dark:bg-slate-800">
      <div className="w-[90%] m-auto sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
        <Router>
          <Routes>
            <Route path="/" element={<Home jobs={jobs} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applied-jobs/:userId" element={<AppliedJobs onGoBack={() => window.history.back()} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
