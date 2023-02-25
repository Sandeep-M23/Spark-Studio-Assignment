import React, { useState } from "react";
import "./Card.css";

interface CardProps {
  data: {
    display_name: string;
    rating: string;
    games_count: string;
    category_name: string;
    original_price: number;
    discounted_price: number;
    name: string;
    certificate_count: number;
    num_classes: number;
    min_age: number;
    max_age: number;
    pitch: string;
    curriculum_outcomes: string[];
  };
}

const Card = ({ data }: CardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const getTag = (src: string) => <img src={`./assests/SVG/${src}`} alt={src} />;

  const sessionTag = getTag(
    data.category_name === "Communication"
      ? "session.svg"
      : data.category_name === "Visual Arts"
      ? "session-2.svg"
      : data.category_name === "Music"
      ? "session-3.svg"
      : ""
  );
  const sessionDarkTag = getTag(
    data.category_name === "Communication"
      ? "session-dark.svg"
      : data.category_name === "Visual Arts"
      ? "session-2-dark.svg"
      : data.category_name === "Music"
      ? "session-3-dark.svg"
      : ""
  );
  const percentTag = getTag(
    data.category_name === "Communication"
      ? "percent.svg"
      : data.category_name === "Visual Arts"
      ? "percent-2.svg"
      : data.category_name === "Music"
      ? "percent-3.svg"
      : ""
  );
  const percentDarkTag = getTag(
    data.category_name === "Communication"
      ? "percent-dark.svg"
      : data.category_name === "Visual Arts"
      ? "percent-2-dark.svg"
      : data.category_name === "Music"
      ? "percent-3-dark.svg"
      : ""
  );

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const getType = () =>
    data.category_name === "Communication"
      ? "communicationCard"
      : data.category_name === "Visual Arts"
      ? "visualCard"
      : data.category_name === "Music"
      ? "musicCard"
      : "";

  const cardTagStyle = {
    backgroundColor:
      data.category_name === "Communication"
        ? "#EDFCFF"
        : data.category_name === "Visual Arts"
        ? "#DCCCFF"
        : data.category_name === "Music"
        ? "#FFEDC8"
        : " ",
  };

  const items = showMore ? data.curriculum_outcomes : data.curriculum_outcomes.slice(0, 3);
  const rating = parseInt(data.rating.split(";")[0]);
  const numReviews = data.rating.split(";")[2];

  const stars = Array.from({ length: 5 }, (_, i) => (
    <img
      src={`./assests/SVG/${i < rating ? "star.svg" : "empty-star.svg"}`}
      alt={`star-${i}`}
      key={`star-${i}`}
    />
  ));

  return (
    <div
      className={`card ${getType()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-heading">
        <div className="discount-tag">
          {isHover ? percentDarkTag : percentTag}
          <p>
            20% <br />
            off
          </p>
        </div>
        <div className="session-tag">
          {isHover ? sessionDarkTag : sessionTag}
          <p style={{ color: isHover ? "black" : "white" }}>18 Sessions</p>
        </div>
        <div className="title-section">
          <h3 className="title">{data.name}</h3>
          <div className="review-section">
            {stars}
            <p>({numReviews} reviews)</p>
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="card-main-content">
          <div className="card-body">
            <p className="card-info">{data.pitch}</p>
            <h3 className="student-heading">Students will achieve:</h3>
            <ul className="student-list">
              {items.map((o, i) => {
                return <li key={i}>{o}</li>;
              })}
              {!showMore ? <li>+......</li> : null}
            </ul>
            <div className="details">
              <button onClick={() => setShowMore((prevState) => !prevState)}>
                View Detailed lesson plan
              </button>
            </div>
          </div>
          <hr className="horizontal" />
          <div className="pricing">
            <div className="pricing-left">
              <h3>₹ {data.original_price}</h3>
              <p>₹ {data.discounted_price}</p>
            </div>
            <div className="pricing-right">
              <h3>₹ {data.num_classes}</h3>
              <p>per class</p>
            </div>
          </div>
          <div className="notice">
            <p>We'll schedule the slots as per your convenience</p>
          </div>
        </div>
        <div className="card-footer">
          <div className="tag-section" style={cardTagStyle}>
            <span className="tags">
              <img src="./assests/SVG/activity.svg" />
              <p>8 Activities</p>
            </span>
            <span className="tags">
              <img src="./assests/SVG/games.svg" />
              <p>{data.games_count} Games</p>
            </span>
            <span className="tags">
              <img src="./assests/SVG/certificate.svg" />
              <p>1 {data.certificate_count} Certificate</p>
            </span>
          </div>
          <div className="buyCourse">
            <button>Buy Course</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
