import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar'
import './CSS/Computer.css'
function Computer() {
  const [dateOfPurchase, setdateOfPurchase] = useState("");
  const [dateOfInstall, setdateOfInsatll] = useState("");
  const [company, setcompany] = useState("");
  const [category, setcategory] = useState("");
  const [serialNo, setserialNo] = useState("");
 
  


  const navigate = useNavigate();

  //Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const chk = () => {
    console.log(dateOfPurchase);
    console.log(dateOfInstall);
    console.log(company);
    console.log(category);
  };

  const PostDetails = () => {
    fetch("http://localhost:5000/createComputer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        dateOfPurchase,
        dateOfInstall,
        company,
        category,
        serialNo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Succesfully Posted");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //saving post to mongoDB
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container1" style={{marginBottom : "30px"}}>
        <h1>Add All Details</h1>

        <h3>Category</h3>
        <select value={category} onChange={(e) => setcategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Computer">Computer</option>
          <option value="Scanner">Scanner</option>
          <option value="Printer">Printer</option>
          <option value="UPS">UPS</option>
        </select>


        <h3>SerialNo</h3>

        <input
          type="text"
          placeholder="Serial No"
          value={serialNo}
          onChange={(e) => setserialNo(e.target.value)}
        />


        <h3>Company</h3>

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setcompany(e.target.value)}
        />



        <h3>Date Of Purchase</h3>
        <input
          type="date"
          placeholder="Date Of Purchase"
          value={dateOfPurchase}
          onChange={(e) => setdateOfPurchase(e.target.value)}
        />



        <h3>Date Of Install</h3>
        <input
          type="date"
          placeholder="Date Of Install"
          value={dateOfInstall}
          onChange={(e) => setdateOfInsatll(e.target.value)}
        />

        

        {/* <div className="ComputerBtn"> */}
        <button className="ComputerBtn" onClick={PostDetails}>
          Post
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Computer;
