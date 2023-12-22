import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" />
        
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" />
      </div>
      <div>
        <button type="submit">Kaydol</button>
      </div>
    </div>
  );
};

export default Login;
