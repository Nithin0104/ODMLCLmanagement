import React, { useState, useEffect } from "react";
import "../css/Notification.css";
import user from "../images/mes.png";
import Header from "./Header";
import websiteDataService from "../services/website.js";

export default function AdmEvent() {
  const [messages, setMessages] = useState([]);
  
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data={rollno:JSON.parse(sessionStorage.getItem("userDetail")).rollno}
        console.log("data:",data);
        const response = await websiteDataService.getMessage(data);
        console.log("response:", response);
        setMessages(response.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
        setMessages([]);
      }
    };

    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Adjust the locale as per your requirement
  };

  return (
    <div className="Nfull">
      <Header />
      <div className="Nmain">
        <div className="Nmiddle">
          <div className="head">
            <div>NOTIFICATION</div>
          </div>
          <div className="content">
            {messages.map((message) => (
              <div className="Slab" key={message._id}>
                <div className="phot"><img className="userphoto1" src={user} /></div>
                <div className="descp">
                  <div className="descp1">
                    Teacher:
                    <div className="ans">{message.teacher}</div>
                    Date:
                    <div className="ans">{formatDate(message.date)}</div>
                  </div>
                  <div className="descp1">
                    Title:
                    <div className="ans">{message.title}</div>
                    Status:
                    <div className="ans">{message.status}</div>
                  </div>
                  <div className="descp1">
                    From:
                    <div className="ans">{formatDate(message.from)}</div>
                    To:
                    <div className="ans">{formatDate(message.to)}</div>
                  </div>
                  <div className="descp11">
                    Reason:
                    <div className="ans">{message.reason}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
