import React, { useState } from "react";
import PropTypes from "prop-types";
import ForgotPage from "../index/forgot";
import { Link } from "react-router-dom";

async function loginUser(credentials) {
  return fetch('http://localhost:5000/login', {
     method: 'POST',
     headers:{
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(credentials)
  })
  .then(data => data.json());
}



export default function Login  ({ setToken }) {

    // variabel penampun data mengunakan useState() 
    const [email , SetEmail ] = useState("");
    const [password , SetUserPassword] = useState("");
    const [eror, setEror] = useState(true);

    // handle submit 
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        email,
        password,
      });
      setEror(token.LoggedIn);
      setToken(token)
      console.log(token);
    }
    
    return (
      <div>
        <div class="login-box" 
        style={{ 
          marginTop: "10%",
          marginLeft: "37%", 
        }}>
        <div className="login-logo">
          <a href="">
            <b>Inventory</b>APP
          </a>
        </div>
        {eror ? '' 
        :<div class="alert alert-danger" role="alert">        
          make sure your password and username are correct.
         </div>
        }
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your app</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={e => SetEmail(e.target.value)}
                 />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password" 
                  onChange={e => SetUserPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <Link to="/forgot" >i forgot my password.</Link>
                 </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    );

    
 
  }

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

