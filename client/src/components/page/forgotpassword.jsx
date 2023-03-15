import React, { useState } from 'react'


async function resetPassword(credentials){

  return fetch('http://localhost:5000/reset_password', {
     method: 'POST',
     headers:{
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(credentials)
  })
  .then(data => data.json());

}


export default function Forgotpassword () {
  const [email, setEmail] = useState();
  const [response, setResponse] = useState();
  const [eror, setEror] = useState();


  
  const handleSubmit = async e => {
    e.preventDefault();
    const request = await resetPassword({
      email
    });
    localStorage.status = request.status

    if (JSON.parse(localStorage.status) == true) {
        setEror(<div class="alert alert-success" role="alert">        
                  Send to email successful check your email
                </div>)

   }else if (JSON.parse(localStorage.status) == false) {

    setEror(<div class="alert alert-danger" role="alert">        
            Your email is not registered
          </div>)
   }
 
}
  
 
 

    return (
        <div className="login-box" 
        style={{ 
          marginTop: "10%",
          marginLeft: "37%", 
        }}
        >
      <div className="login-logo">
        <a href="">Reset <b>Password</b></a>
      </div>
      {eror}
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">To reset your password, enter the email address you used to sign up.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">Request new password</button>
              </div>
              {/* /.col */}
            </div>
          </form>
          <p className="mt-3 mb-1">
            <a href="/">Login</a>
          </p>
          <p className="mb-0">
          </p>
        </div>
      </div>
    </div>

    );
  }


