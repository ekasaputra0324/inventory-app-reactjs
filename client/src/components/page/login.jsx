import React, { useState } from "react";
import PropTypes from "prop-types";



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

    const [name , SetUserName ] = useState();
    const [password , SetUserPassword] = useState();
    const [eror, setEror] = useState(true);

    const onChangeCheckbox = e => {
      e.preventDefault();

    }

    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        name,
        password,
      });
      setEror(token.LoggedIn);
      setToken(token)
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
            <p className="login-box-msg">Login in to start your session</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="name"
                  className="form-control"
                  placeholder="Username"
                  
                  onChange={e => SetUserName(e.target.value)}
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
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember"/> 
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
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

