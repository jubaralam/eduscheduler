/* eslint-disable react/prop-types */
import axios from "axios";
import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CourseCard = ({ _id, title, description, poster, token }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    localStorage.removeItem("course");
    localStorage.setItem(
      "course",
      JSON.stringify({
        _id,
        title,
        description,
        poster,
        token,
      })
    );
    navigate(`/admin-dashboard/assign/${_id}`);
  };

  return (
    <>
      <Card sx={{ maxWidth: 350 }} onClick={handleRedirect}>
        <CardMedia sx={{ height: 140 }} image={poster} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
          <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
      {/* <div className={`card ${priority?.toLowerCase()}`}>

        
      <div className="flex justify-between flex-wrap">
        <div className="priority-tag">
          <h4>{priority.replace(/_/g, " ").toUpperCase()}</h4>
          {isOverdue && <span className="overdue-tag">🚨 Overdue</span>}
        </div>
        <div className="card-status">
          <p className={`status ${status?.toLowerCase()}`}>{status}</p>
          <p className="due-date">
            📅 {new Date(dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="card-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="card-actions">
        <button
          className="btn update-btn"
          onClick={handleUpdate}
          disabled={loading}
          >
          ✏️ Update
        </button>
        <button
          className="btn delete-btn"
          onClick={handleDelete}
          disabled={loading}
          >
          🗑️ {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div> */}
    </>
  );
};

export default CourseCard;
