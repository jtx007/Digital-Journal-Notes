import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { LoginContext } from '../auth/loginContext';
import digitalJournalLogin from '../api/digitalJournalLogin'

const LoginForm = ({
  isLoggedIn,
  formType,
  label1,
  label2,
  setIsLoggedIn,
  setUserId,
  setToken,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {  
        const response = await digitalJournalLogin.post("/login", 
            {"username": username, "password": password}
        ,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("isLoggedIn", true);
        setToken(response.data.token);
        setUserId(response.data.user_id);
        setIsLoggedIn(true);

    } catch (error) {
        console.log(error.response.data.error)
    }
  };


  const renderFormOrRedirect = () => {
    if (!isLoggedIn) {
      return (
        <form
          onSubmit={handleFormSubmit}
          className="ui segement container form"
        >
          <h1 className="header">{formType}</h1>
          <div className="field">
            <label>{label1}</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
            />
          </div>
          <div className="field">
            <label>{label2}</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
            />
          </div>
          <button className="ui primary button" type="submit">
            Submit
          </button>
        </form>
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  return <>{renderFormOrRedirect()}</>;
};

const LoginFormWithContext = (props) => {
    return (
        <LoginContext.Consumer>
            {value => {
                return <LoginForm {...value} {...props} />
            }}
        </LoginContext.Consumer>
    )
}



export default LoginFormWithContext