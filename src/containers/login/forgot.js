import React, { Fragment } from 'react';
import logo from '../../assets/logo.png'
const ForgotPass = () => {
    return (
        <div className="page">
        <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src={logo} className="h-9" alt="" />
              </div>
              <form class="card" action="" method="post">
                <div class="card-body p-6">
                  <div class="card-title">Forgot password</div>
                  <p class="text-muted">Enter your email address and your password will be reset and emailed to you.</p>
                  <div class="form-group">
                    <label class="form-label" for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                  </div>
                  <div class="form-footer">
                    <button type="submit" class="btn btn-primary btn-block">Send me new password</button>
                  </div>
                </div>
              </form>
              
            </div>
          </div>
        </div>
    </div>
    </div>
    )
}
export default ForgotPass;