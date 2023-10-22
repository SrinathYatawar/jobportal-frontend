import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Jobs from '../Job/Jobs';
import DashboardHeader from '../DashboardHeader/DashboardHeader';


const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [jobs, setJobs] = useState([]);

    const host = 'https://jobportal-f9io.onrender.com/';

  // Function to fetch job postings
  const fetchJobs = async () => {
    try {
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
  
    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem('accessToken'); // Get the token from local storage


        if (token===undefined || token === null) {
          navigate('/login'); 
          return;
        }
  
          try {
            const response = await axios.post(`${host}api/auth/getuser`, null, {
                headers: {
                    Authorization: `${token}`,
                },
              });
                
            

          if (response.status === 200) {
            const userData = response.data;
            setUser(userData);
            setLoading(false);
          } else if (response.status === 401) {
            navigate('/login');
          } else {
            setError('Error fetching user data');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data');
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, [navigate]);
  
    return (
      <div>
       <DashboardHeader userData={user}/>
        <Jobs jobs = {jobs} user = {user}/>
      </div>
    );
  };
  
  export default Dashboard;