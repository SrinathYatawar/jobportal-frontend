import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const DashboardNavbar = ({ userData, onLogout }) => {
  const Navigate = useNavigate();
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const toggleLogout = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };

  const handleLogout = () => {
    // Destroy the token (e.g., by removing it from local storage or clearing cookies)
    localStorage.removeItem('accessToken');

    // Redirect to the home page
    Navigate('/');
  };

  const userId = userData ? userData._id : null;

  return (
    <nav className="py-4"  style={{
      backgroundColor: '#00776b',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '10px',
      width: '100%',
    }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center">
          <div className="relative group">
            <button className="mr-4">
              <Link to={`/applied-jobs/${userId}`}>Applied Jobs</Link>
            </button>
          </div>
          {console.log(userData)}
          <div className="relative group" onClick={toggleLogout}>
          {userData !== null && (
  <button className="mr-4">
  Hello, <br />
  {userData.name.toUpperCase()}<br />
</button>
)}
            {isLogoutVisible && (
              <button
                className="absolute block bg-blue-500 text-white right-0 top-full mt-2 p-2 rounded-lg shadow-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
