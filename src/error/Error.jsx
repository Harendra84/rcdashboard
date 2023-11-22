import React from 'react'
import './Error.css';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';


const notify = () => toast("Here is your toast.");


const Error = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/auth/logout`
      );
      console.log(res);
        localStorage.removeItem("loginStatus");
        localStorage.removeItem("userInfo");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };


  return (
    
    <section className="page_404">
	<div className="container">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className="col-sm-10 col-sm-offset-1  text-center">
		<div className="four_zero_four_bg">
			<h1 className="text-center ">404</h1>
		
		
		</div>
		
		<div className="contant_box_404">
		<h3 className="h2">
		Look like you&rsquo;re lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
		<a href="#" onClick={handleLogout} className="link_404">Go to Login Page</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
  )
}

export default Error