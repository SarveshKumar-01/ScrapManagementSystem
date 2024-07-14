import React ,{useState , useContext} from 'react'

import './CSS/SignIn.css';
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// import { LoginContext } from '../context/LoginContext';

function SignIn() {

    // const {setUserLogin} = useContext(LoginContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    //Toast functions
    const notifyA = (msg)=> toast.error(msg);
    const notifyB = (msg)=> toast.success(msg);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = () => {
        //checking Email
        if(!emailRegex.test(email)){
            notifyA("Invalid Email")
            return
        }


        //Sending data to server
        fetch("http://localhost:5000/signin" , {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                
                 email : email,
                 password : password
                 
            })
        }).then(res=>res.json())
        .then(data => {
            if(data.error){
                notifyA(data.error)
                
            }else{
                notifyB("Signed in Successfully")
                console.log(data) // this data stores our token (Unique ID)
                localStorage.setItem("jwt" , data.token)
                localStorage.setItem("user" ,JSON.stringify(data.user))
                // setUserLogin(true)
                navigate("/");
            }
            console.group(data)
        })
    }

  return (
    <div className='signIn'>
           <div className="SignInBox">
           <div style={{width : "50%"}}>
                <div className='loginForm'>
                    <img className='signUpLogo' src="" alt='' />

                    <h1>Sign In</h1>

                    <div>
                        <input type='email' value={email} name='email' id='email' placeholder='Email' 
                        onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div>
                        <input type='password' value={password} name='password' id='password' placeholder='Password'
                        onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>
                    <input type='submit' id='login-btn' value="Sign In" 
                    onClick={() => {postData()}}/>
                </div>

                <div className='loginForm2'>
                    Don't have an account ?
                    <Link to="/signup">
                        <span style={{ color: 'blue', cursor: "pointer" }}>Sign Up</span>
                    </Link>
                </div>  

            </div>
           </div>
        </div>
  )
}

export default SignIn