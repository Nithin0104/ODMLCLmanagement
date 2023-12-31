import React from "react";
import { Link } from "react-router-dom";
import calstart from "../images/calstart.png";
import calend from "../images/calend.png";
import college from "../images/college.png";

export default function StuListSlab(props) {
  const fromDate = new Date(props.data.props.from).toLocaleDateString();
  const toDate = new Date(props.data.props.to).toLocaleDateString();

  const handleClick = () => {
    console.log("props.data.props:", props.data.props);
    // Store the props.data.props value in sessionStorage
    sessionStorage.setItem("eventData", JSON.stringify(props.data.props));
  };

  return (
    <div className="EventSlab">
      <div className="EventSp"><img className="userphoto" src={college} alt="polygon" /></div>
      <div className="EventSdet">
        <div className="Eve1">
          <p>{props.data.props.title}</p>
        </div>
        <div className="Eve2"></div>
        <div className="Eve3">
          <div className="Eve31">
            <p>
              <img className="calsa" src={calstart} alt="polygon" /> {fromDate}
            </p>
          </div>
          <div className="Eve32">
            <p>
              <img className="calen" src={calend} alt="polygon" /> {toDate}
            </p>
          </div>
        </div>
        <div className="Eve4">
          <p>
            <b>ORGANIZER: </b>
            {props.data.props.org}
          </p>
        </div>
        <div className="Eve5">
          <p>
            <b>DEPT:</b> {props.data.props.dept.join(" ")}
          </p>
        </div>
        <div className="Eve6">
          <div className="Eve61">
            <p>
              <b>COUNT:</b> {props.data.props.count}
            </p>
          </div>
          <div className="Eve62">
            <Link to="/student/eventod" onClick={handleClick}>
              <p>
                <b>APPLY</b>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
