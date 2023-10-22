import React, { useState, useEffect } from "react";
import Application from "../Application/Application";
import axios from 'axios'

const Jobs = ({ jobs, user }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  // Slice the jobs array to display only the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleApply = async (data) => {
    // Handle form data here, e.g., send it to your server
    const applicationData = {
      title: data.title,
      salary: data.salary,
      category: data.category,
      userId: user._id
    };
    
    try {
      // Make a POST request to your server
      const host = 'https://jobportal-f9io.onrender.com/';
      const response = await axios.post(`${host}api/fetch/jobs/apply`, applicationData);

      // Handle the response, e.g., show a success message or perform any other action
      console.log("Application submitted successfully:", response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting application:", error);
    }

    setIsPopupOpen(false);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <section id="jobs">
      <div className="flex gap-10 justify-center flex-wrap items-center py-5 sm:py-10">
        {currentJobs.map((job) => {
          return (
            <div
              key={job.id}
              className="flex-grow group flex flex-col justify-between h-[300px] w-[250px] p-3 md:p-[20px] mt-4 bg-white rounded-md shadow-lg shadow-gray-400 dark:hover:bg-blueColor hover:bg-[#2a68ff] dark:bg-slate-700 dark:shadow-none"
            >
              <div className="upperpart flex justify-between items-center">
                <div className="titlecountry flex-grow">
                  <p className="title font-bold group-hover:text-white text-xl dark:text-blueColor">
                    {job.title}
                  </p>
                  <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400">
                    {job.location}
                  </p>
                </div>
              </div>
              <div className="lowerpart border-t-2 mt-4 group-hover:text-white">
                <p className="mt-4 text-sm text-[#adaaaa] group-hover:text-white dark:text-slate-200">
                  {job.description}
                </p>
                <div className="company flex justify-start items-center mt-4 mb-3">
                  <p className="text-sm font-medium ml-1 dark:text-slate-300">
                    {job.company + "     " + job.salary}
                  </p>
                </div>
              </div>
              {user&&
              <button
                className="border-[2px] font-medium rounded-[10px] block p-2 w-full dark:text-slate-100 dark:bg-blueColor dark:border-transparent dark:group-hover:border dark:group-hover:border-white dark:hover:text-blueColor dark:hover:bg-white hover:bg-white"
                onClick={() => {
                  setIsPopupOpen(true);
                  setSelectedJob(job); // Set the selected job when the button is clicked
                }}
              >
                Apply Now
              </button>
        }
            </div>
          );
        })}
      </div>
      {currentJobs.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="mx-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            &#8592; {/* Left Arrow */}
          </button>
          <button
            onClick={goToNextPage}
            disabled={indexOfLastJob >= jobs.length}
            className="mx-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover-bg-blue-600"
          >
            &#8594; {/* Right Arrow */}
          </button>
        </div>
      )}
      {selectedJob && (
        <Application
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onApply={handleApply}
          job={selectedJob}
        />
      )}

      
      <footer className="text-center py-4">
        &copy; Beekin_test {new Date().getFullYear()}
      </footer>
    </section>
  );
};

export default Jobs;
