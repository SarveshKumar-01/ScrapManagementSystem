import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import "./CSS/Generate.css";

function GenerateReport() {
  const [data, setdata] = useState([]);
  const [Pid, setPid] = useState("");

  const navigate = useNavigate();
  //Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const checkDtails = (Pid) => {
    fetch(`http://localhost:5000/computer/${Pid}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA("Not Found");
          setdata(null);
        } else {
          notifyB("Found");
          console.log(data); // this data stores our token (Unique ID)
          setdata(data);
        }
        // console.group(data)
      });
  };

  const printReport = () => {
    const printContents = document.getElementById('printableArea').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore the original content
  };

  const chk = () => {
    console.log(data);
  };

  useEffect(() => {
    // data = "not found";
  }, []);

  return (
    <div>
      <Navbar />

      <h1>Generate</h1>

      <div className="GenerateBox">
        <div className="FoundBox">
          <input 
            type="text"
            placeholder="Id"
            value={Pid}
            onChange={(e) => {
              setPid(e.target.value);
            }}
          />

          <button className="GenerateBtn"
            onClick={() => {
              checkDtails(Pid);
            }}
          >
            Find
          </button>
        </div>
      </div>

      {data ? (


        <div className="generateBox">
          <div style={{ width: "60%" }} id="printableArea">
            <h3>Details</h3>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px" }}>Field</th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>SerialNo</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{data.serialNo}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>Category</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{data.category}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>Company</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{data.company}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>Date of Install</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{data.dateOfInstall}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>Date of Purchase</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{data.dateOfPurchase}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>Key</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{data.UniqueKey}</td>
                </tr>
                {/* <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>Remark</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{data.Remark}</td>
                </tr> */}
              </tbody>
            </table>



            <div className="signature" >

              <h3>Remark</h3>
              <p>Scrapable : {data.Remark}</p>
              <h3>Signature</h3>
              <p>Senior enginger_________________________________</p>

            </div>

          </div>
          <button className="Rptbtn"  
           onClick={printReport} style={{ marginTop: "20px", marginBottom: "35px", padding: "10px 20px", fontSize: "16px" }}>
            Print Report
          </button>



        </div>
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
}

export default GenerateReport;
