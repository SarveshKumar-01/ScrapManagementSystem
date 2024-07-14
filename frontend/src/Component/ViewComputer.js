import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

function ViewComputer() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }

    //  Fetching all the posts
    fetch("http://localhost:5000/allcomuters", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))

      .catch((err) => console.log(err));
  }, []);

  const chk = () => {
    console.log(data);
  };

  return (
    <div>
      <Navbar/>
      <h1>All Data</h1>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid black" , borderTop: "1px solid black" }}>Serial No</th>
            <th style={{ borderBottom: "1px solid black" , borderTop: "1px solid black" }}>Category</th>
            <th style={{ borderBottom: "1px solid black" , borderTop: "1px solid black" }}>Company</th>
            <th style={{ borderBottom: "1px solid black" , borderTop: "1px solid black" }}>Date Of Install</th>
            <th style={{ borderBottom: "1px solid black" , borderTop: "1px solid black" }}>Date Of Purchase</th>
            
            <th style={{ borderBottom: "1px solid black" , borderTop: "1px solid black" }}>Key</th>
          </tr>
        </thead>
        <tbody>
          {data.map((computer) => (
            <tr key={computer._id} style={{ borderBottom: "1px solid gray" }}>
              <td>{computer.serialNo}</td>
              <td>{computer.category}</td>
              <td>{computer.company}</td>
              <td>{computer.dateOfPurchase}</td>
              <td>{computer.dateOfPurchase}</td>
              
              <td>{computer.UniqueKey}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewComputer;
