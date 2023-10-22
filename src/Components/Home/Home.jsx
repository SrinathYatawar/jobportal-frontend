import React,{useState,useEffect} from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Jobs from '../Job/Jobs'
import Value from '../Value/Value'

const Home = ({jobs}) => {

    return (
      <div className="w-full dark:bg-slate-800">
        <div className="w-[90%] m-auto sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
          <Header/>
          <main>
            <Jobs  jobs = {jobs}/>
            <Value />
           </main>
          <Footer />
        </div>
      </div>
  
    );
  };
  
export default Home;
  