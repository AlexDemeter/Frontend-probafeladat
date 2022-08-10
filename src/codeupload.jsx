import React, { useState } from "react";
import Moment from 'moment';
import {useNavigate} from "react-router-dom";

const Codeupload = () => {

    const [date, setDate] = useState(Moment().format("MM-D"));
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [hour, setHour] = useState();
    const [min, setMin] = useState();
    const [purchaseTime, setPurchaseTime] = useState();
    const minList = [];
    const hourList = [];
    const formatDate = Moment().format("MMMM D");
    const monthList = ["July", "August"];
    const monthdayList = [];
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    for (let month = 0; month < monthList.length; month++) {
        for (let day = 1; day < 32; day++) {
            monthdayList.push(`${monthList[month]} ${day}`);
        }
    }

    for (let index = 0; index < 60; index++) {
        if (index < 10) {
            minList.push(`0${index}`);
        } else {
            minList.push(index);
        }
    }
    for (let index = 0; index < 24; index++) {
        if (index < 10) {
            hourList.push(`0${index}`);
        } else {
            hourList.push(index);
        }
    }

    const [submit, setSubmit] = useState(false);

    const uploadCodeToApi = async () => {
        try {
            const res = await fetch("https:/ncp-dummy.staging.moonproject.io/api/demeter-alex/code/upload", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  email: email,
                  code: code,
                  purchase_time: purchaseTime,
              }),
            });
            const resJson = await res.json();
            if (res.status === 200) {
                if (resJson.data.won === true) {
                    setMessage("Congratulations, you win!");
                } else {
                    setMessage("We're sorry, you didn't win.");
                }
                
            } else {
                navigate(`/Frontend-probafeladat/register/${email}`);
            }
          } catch (err) {
            console.log(err);
          }

    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        setEmail(event.target.email.value);
        setCode(event.target.code.value);
        setDate(event.target.date.value);
        setHour(event.target.hour.value);
        setMin(event.target.minute.value);

        if ((min !== undefined) && (min !== "default") && (hour !== "default") && (hour !== undefined)) {
            setSubmit(true);
        } else {
            alert("Choose time")
        }
        setPurchaseTime(`2022-${date} ${hour}:${min}`);
    }

    if (submit === true) {
        uploadCodeToApi();
        setSubmit(false);
    }
    

    return(
        <form onSubmit={handleSubmit}>
            <p>Code upload</p>
            <input onChange={(e) => setEmail(e.target.value)} required type="text" id="email" name="email" placeholder='Email'/><br/>
            <input onChange={(e) => setCode(e.target.value)} required type="text" id="code" name="code" placeholder='Code' pattern="[a-zA-Z0-9]+" size="8" minLength="8" maxLength="8"/><br/>
            <h5>Purchase date:</h5>
            <div>
                <select onChange={(e) => setDate(e.target.value)} name='date' id="date" required>
                    <option disabled value={date} selected hidden>{formatDate}</option>
                    {monthdayList && monthdayList.map((monthday) =>
                        <option className="mintext" value={monthday.split(" ")[0] === "July" ? "07-"+monthday.split(" ")[1] : "08-"+monthday.split(" ")[1]}>{monthday}</option>
                    )};
                </select>
                <select onChange={(e) => setHour(e.target.value)} name='hour' id="hour" required>
                    <option disabled value="default" selected hidden>Hour</option>
                    {hourList && hourList.map((hour) =>
                        <option className="mintext" value={hour}>{hour}</option>
                    )};
                </select>
                <select onChange={(e) => setMin(e.target.value)} name='minute' id="minute" required>
                    <option disabled value="default" selected hidden>Minute</option>
                    {minList && minList.map((min) =>
                        <option className="mintext" value={min}>{min}</option>
                    )};
                </select>
            </div>
            <button type="sumbit" value="Submit">Upload</button><br/>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    );
}

export default Codeupload;