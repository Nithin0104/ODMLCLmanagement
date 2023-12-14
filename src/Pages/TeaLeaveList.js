import React, { useState } from "react";
import "../css/teacher/TeaLeaveList.css";
import accept from "../images/checked.png";
import reject from "../images/decline.png";
import websiteDataService from "../services/website.js";
import user from "../images/user.png";

export default function TeaLeaveList(props) {
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Adjust the locale as per your requirement
  };

  const handleAccept = async () => {
    const data = { _id: props.data._id, status: "accepted" };
    await websiteDataService.putLeaveStatus(data);
    window.location.reload(); // Reload the page
  };

  const handleReject = () => {
    setShowPopup(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const data = {
      teacher: JSON.parse(sessionStorage.getItem("userDetail")).username,
      rollno: props.data.rollno,
      date: new Date().toISOString(),
      status: "rejected",
      title: props.data.title,
      from: props.data.from,
      to: props.data.to,
      reason: reason,
    };
    console.log("data:", data);
    const data1 = { _id: props.data._id, status: "rejected" };
    await websiteDataService.putLeaveStatus(data1);
    await websiteDataService.putMessage(data);
    window.location.reload(); // Reload the page
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const abc = { rollno: props.data.rollno };
        const user = await websiteDataService.getUserName(abc);
        setUsername(user.data);
      } catch (error) {
        console.log("Error fetching username:", error);
        setUsername("");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="slab">
      <div className="photo">
        <div className="pic"><img src={user}/></div>
        <p>{username}</p>
        <p>{props.data.rollno}</p>
      </div>
      <div className="desc">
        <div className="desc1">
          <div className="fit">
            <p>
              <span>Title:</span> {props.data.rollno}
            </p>
          </div>
          <div className="fit">
            <p>
              <span>Cause:</span> <p>{props.data.cause}</p>
            </p>
          </div>
          <div className="fit">
            <p>
              <span>Role:</span> {props.data.sturole}
            </p>
          </div>
          <div className="date">
            <p>
              <span>From:</span> {formatDate(props.data.from)}
            </p>
            <p>
              <span>To:</span> {formatDate(props.data.to)}
            </p>
          </div>
        </div>
      </div>
      <div className="decision">
        <div className="dd1" onClick={handleAccept}>
          <img className="odimgq" src={accept} alt="polygon" />
        </div>
        <div className="dd1" onClick={handleReject}>
          <img className="odimgq" src={reject} alt="polygon" />
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label>Reason:</label>
              <input type="text" value={reason} onChange={handleReasonChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
