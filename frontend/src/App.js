import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";




import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Home from "./Component/Home";
import Computer from "./Component/Computer";
import ViewComputer from "./Component/ViewComputer";
import GenerateReport from "./Component/GenerateReport";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/computer' element={<Computer/>}></Route>
          <Route path='/viewcomputer' element={<ViewComputer/>}></Route>
          <Route path='/generate' element={<GenerateReport/>}></Route>
          

        </Routes>
        <ToastContainer theme="dark" />
      </div>
    </BrowserRouter>
  );
}

export default App;
