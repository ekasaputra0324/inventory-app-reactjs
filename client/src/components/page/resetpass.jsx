import React, { useState } from "react";
import { useParams } from "react-router-dom";


async function ChangePassword(credentials){
    return fetch('http://localhost:5000/change_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}



export default function Resetpassword() {
    // variabel penampun data mengunakan useState() 
    const {token} = useParams();
    const [password, SetPassword] = useState();
    const [password2, SetPassword2] = useState();
    const [err, SetErr] = useState();

    // handle submit 
    const handleSubmit = async e => {
        e.preventDefault();
        // pengecekan password
        if (password != password2) { 
            SetErr(<div class="alert alert-danger" role="alert">        
            Password dont macth!
            </div>)
        }else{
            // request ke server side 
            const change = await ChangePassword({
                 password,
                 token
            });
            // eror handling
             if (change.status === false) {
                SetErr(<div class="alert alert-danger" role="alert">        
                {change.message}
                </div>)
             }else if (change.status === true){
                SetErr(<div class="alert alert-success" role="alert">        
                {change.message}
                </div>)
             }    
        }
    }
   
  return (
    <div>
      <div className="login-box" 
      style={{ 
        marginTop: "10%",
        marginLeft: "37%", 
      }}
      >
        <div className="login-logo">
          <a href="">
            <b>Password</b>Reset
          </a>
        </div>
        {err}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              You are only one step a way from your new password, recover your
              password now.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  onChange={ e => SetPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={ e => SetPassword2(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Change password
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <p className="mt-3 mb-1">
              <a href="/">Login</a>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
}
