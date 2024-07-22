import { MdOutlineStar } from "react-icons/md";
import { useState } from "react";
import "./star-rating-controls.css";
import '../SpotDetailsPage/spotdetails.css'

function StarRatingControls({ stars, onChange }) {
  const [activeRating, setActiveRating] = useState(stars);

  return (
    <>
      <div
        className="rating-input"
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
      >
        <label htmlFor="stars">
          <div
            onClick={() => onChange(1)}
            onMouseEnter={() => setActiveRating(1)}
            className={activeRating >= 1 ? "filled" : "empty"}
          >
            <MdOutlineStar />
          </div>
          <div
            onClick={() => {
              onChange(2);
            }}
            onMouseEnter={() => {
              setActiveRating(2);
            }}
            className={activeRating >= 2 ? "filled" : "empty"}
          >
            <MdOutlineStar />
          </div>
          <div
            onClick={() => {
              onChange(3);
            }}
            onMouseEnter={() => {
              setActiveRating(3);
            }}
            className={activeRating >= 3 ? "filled" : "empty"}
          >
            <MdOutlineStar />
          </div>
          <div
            onClick={() => {
              onChange(4);
            }}
            onMouseEnter={() => {
              setActiveRating(4);
            }}
            className={activeRating >= 4 ? "filled" : "empty"}
          >
            <MdOutlineStar />
          </div>
          <div
            onClick={() => {
              onChange(5);
            }}
            onMouseEnter={() => {
              setActiveRating(5);
            }}
            className={activeRating >= 5 ? "filled" : "empty"}
          >
            <MdOutlineStar />
          </div>
          {" "}Stars
        </label>
      </div>
    </>
  );
}

export default StarRatingControls;
