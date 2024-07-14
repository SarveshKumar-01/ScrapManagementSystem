import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Navbar from './Navbar'
import './CSS/Home.css';

function Home() {

  const navigate = useNavigate();
  const [date, setDate] = useState("");

  const chk = () => {
    console.log(date);
  }





  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signin")
    }
  }, []);


  return (
    <div >
      {/* <input type="date" placeholder='Date' value={date}  onChange={(e)=>{setDate(e.target.value)}} />
      <button onClick={() => {chk()}}>Chk</button> */}

      <Navbar />

      <h1> All Functions</h1>

      <div className="FunctionParent" style={{}}>
        <div className="AllFunction" style={{ width: "75%" }}>
          <Link to={'/computer'}>
            <button className='HomeBtns'>Add Details</button>
          </Link>
          <Link to={'/viewcomputer'}>
            <button className='HomeBtns'>View all Data</button>
          </Link>
          <Link to={'/generate'}>
            <button className='HomeBtns'>Generate Report</button>
          </Link>
        </div>
      </div>








    </div>
  )
}

export default Home