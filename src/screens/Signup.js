import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {
 const [credentials, setcredentials] =useState({name:"",email:"",password:"",phoneno:"",location:""})

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location,
          phoneno: credentials.phoneno
        })
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
  
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        alert("Enter Your Valid Credentials");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
  
  

 const onChange = (event) => {
    const { name, value } = event.target;
    setcredentials({ ...credentials, [name]: value });
  }
  

  return (
    <>
      <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>

       <div className="container">
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="Name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
   </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp "name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="form-outline mb-3">
  <input type="text" id="phone" className="form-control" pattern="[0-9]{10}" name='phoneno' value={credentials.phoneno} onChange={onChange} />
  <label className="form-label" htmlFor="phone">Phone number </label>
</div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1 "name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1"name='location' value={credentials.location} onChange={onChange}/>
  </div>
  <button type="submit" className="m-3 btn btn-success ">Submit</button>
  <Link  to="/login" className='m-3 btn btn-danger'>Already A User</Link> 
</form>
</div>
      </div>
   
    </>
  )
}