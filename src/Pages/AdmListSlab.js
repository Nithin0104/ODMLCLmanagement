import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import calstart from "../images/calstart.png";
import calend from "../images/calend.png";
import eye from "../images/eye.png";
import college from "../images/college.png";
import db from "../images/delete.png";
import edit from "../images/edit.png";

import websiteDataService from "../services/website.js";

export default function StuListSlab(props) {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    title: props.data.props.title,
    org: props.data.props.org,
    from: props.data.props.from,
    to: props.data.props.to,
  });
  const addRef = useRef();
  const fromDate = new Date(props.data.props.from).toLocaleDateString();
  const toDate = new Date(props.data.props.to).toLocaleDateString();

  const handleClick = () => {
    console.log("props.data.props:", props.data.props);
    // Store the props.data.props value in sessionStorage
    sessionStorage.setItem("eventData", JSON.stringify(props.data.props));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addRef.current && !addRef.current.contains(event.target)) {
        setIsAddVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setIsAddVisible(true);
  };

  const handleDeleteClick = () => {
    const { title, org } = props.data.props;

    // Call the putEventDelete function and pass the required data
    websiteDataService
      .putEventDelete({ title, org })
      .then((response) => {
        console.log("Delete successful");
        // Reload the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Call the updateEvent function and pass the formValues
    websiteDataService
      .updateEvent(formValues)
      .then((response) => {
        console.log("Event updated successfully");
        // Reload the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  const handlePopupClickOutside = (e) => {
    if (addRef.current && !addRef.current.contains(e.target)) {
      setIsAddVisible(false);
    }
  };

  return (
    <div className="aEventSlab">
      <div className="aEventSp"><img src={college} alt="polygon" /></div>
      <div className="aEventSdet">
        <div className="aEve1">
          <p>{props.data.props.title}</p>
        </div>
        <div className="aEve2"></div>
        <div className="aEve3">
          <div className="aEve31">
            <p>
              <img className="calsa" src={calstart} alt="polygon" /> {fromDate}
            </p>
          </div>
          <div className="aEve32">
            <p>
              <img className="calen" src={calend} alt="polygon" /> {toDate}
            </p>
          </div>
        </div>
        <div className="aEve4">
          <p>
            <b>ORGANIZER: </b>
            {props.data.props.org}
          </p>
        </div>
        <div className="aEve5">
          <p>
            <b>DEPT:</b> {props.data.props.dept.join(" ")}
          </p>
        </div>
        <div className="aEve6">
          <div className="aEve61">
            <p>
              <b>COUNT:</b> {props.data.props.count}
            </p>
          </div>
        </div>
      </div>
      <div className="aEventopt">
        <div className="aeo">
          <Link to="/student/eventod" onClick={handleClick}>
            <img className="calsa" src={eye} alt="polygon" />
          </Link>
        </div>
        <div className="aeo">
          <img className="calsa" src={db} alt="polygon" onClick={handleDeleteClick} />
        </div>
        <div className="aeo">
          <img className="calsa" src={edit} alt="polygon" onClick={handleEditClick} />
        </div>
      </div>
      {isAddVisible && (
        <div className="popup"  style={{ zIndex: 20 }}>
          <div className="popup-content" ref={addRef}>
            <form onSubmit={handleFormSubmit}>
              <label>Title:</label>
              <input type="text" name="title" value={formValues.title} onChange={handleFormChange} />
              <label>Organization:</label>
              <input type="text" name="org" value={formValues.org} onChange={handleFormChange} />
              <label>From:</label>
              <input type="text" name="from" value={formValues.from} onChange={handleFormChange} />
              <label>To:</label>
              <input type="text" name="to" value={formValues.to} onChange={handleFormChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="popup-background" onClick={handlePopupClickOutside}></div>
        </div>
      )}
    </div>
  );
}
