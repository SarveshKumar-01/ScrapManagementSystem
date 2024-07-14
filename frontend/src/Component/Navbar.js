import React from 'react'
import './CSS/Navbar.css'
import { Link , useNavigate} from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear()
    window.location.reload();
    navigate("./signin")
  }







  return (
    <div className='Navbar'>
      <div className="NavLogo">
        <Link style={{textDecoration : "none"}} to={'/'}>
          <p>Sarvesh</p>
        </Link>
      </div>
      <div className="NavBtns">
        <Link style={{textDecoration : "none"}}>
          <p>About</p>
        </Link>

        <Link style={{textDecoration : "none"}}>
          <p>Contact</p>
        </Link>

        <Link  style={{textDecoration : "none"}}>
          <p onClick={() => {logout();}}>Logout</p>
        </Link>
      </div>
    </div>
  )
}

export default Navbar