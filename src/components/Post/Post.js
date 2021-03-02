import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import moment from "moment";

let BASE_URL = "http://localhost:8000";

export default function Post(props) {
  let { title, content, image, _id, createdAt } = props.post;
  return (
    <div className="Post">
      <div className="Post-card__top">
        <img
          className="Post-card-image"
          alt={title}
          src={`${BASE_URL}/images/events/${image}`}
        />
        <div className="Post-card-overlay"></div>
        <h2 className="Post-card__top-title">
          {title}{" "}
          <span className="Post-card__top-date">
            {moment(createdAt).fromNow()}
          </span>{" "}
        </h2>
        <Link to={`/edit/${_id}`}>
          <i className="fas fa-ellipsis-h"></i>
        </Link>
      </div>
      <div className="Post-card__bottom">
        <p className="Post-card__bottom-content">{content}</p>
        <div className="Post-card__bottom-actions">
          <button className="Post-card__bottom-action-btn">
            <i className="fa fa-trash" aria-hidden="true"></i>
            <span
              className="Post-card__bottom-action-text"
              onClick={(e) => props.onPostDelete(_id)}
            >
              Delete
            </span>
          </button>
          <button className="Post-card__bottom-action-btn">
            <i className="fa fa-thumbs-up"></i>
            <span className="Post-card__bottom-action-text">Like</span>
          </button>
        </div>
      </div>
    </div>
  );
}
