// import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  let initialData = {
    copyright: "",
    date: "",
    explanation: "vvvv",
    media_type: "",
    title: "",
    url: "",
    staticUrl:"",
  };
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState(initialData);

  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  const handleChange = (selectedDate) => {
    let date = convert(selectedDate);
     setStartDate(selectedDate)
    axios.get(`http://localhost:3001/astronomy/apod/${date}`).then((res) => {
      console.log(res.data);
      setData(res.data.data);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/astronomy/apod").then((res) => {
      console.log(res.data);
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      <div style={{ height: "100vh", width: "100%", backgroundColor: "black" }}>
        <h2 style={{ color: "white" }}>{data.title}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "1000px",
            height: "500px",
            
          }}
        >
          <img alt="eofjf" src={data.url}></img>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => handleChange(date)}
            />
          </div>
        </div>
        <h3 style={{ color: "white" }}>{data.explanation}</h3>
        <h2 style={{ color: "white" }}>{data.copyright}</h2>
        {/* <p style={{ color: "white" }}>{data.media_type}</p> */}
      </div>
    </>
  );
}

export default App;
