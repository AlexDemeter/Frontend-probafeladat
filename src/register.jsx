import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

const Register = () =>{

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { email } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch("https:/ncp-dummy.staging.moonproject.io/api/demeter-alex/user/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                name: name
            }),
          });
          if (res.status === 200) {
            setMessage("Successful registration!");
            navigate("/Frontend-probafeladat")
          } else {
            setMessage("Error during registration!");
          }
        } catch (err) {
          console.log(err);
        }
      };


    return(
        <>
            <form onSubmit={handleSubmit}>
                <p>Registration</p>
                <input
                type="email"
                value={email}
                placeholder="Email"
                required
                /><br/>
                <input
                type="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
                minLength="2"
                /><br/>
                <input 
                className="checkbox" 
                type="checkbox" 
                required
                /><label>I have read and accept the game rules</label><br/>
                <button type="Sumbit">Registration</button><br/>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </>
    )
}

export default Register;