import React from "react";
import { Avatar } from "primereact/avatar";
import { BASE_URL } from "../../config/constants";

import CommentMedia from "./CommentMedia";

function timeAgo(date) {
  date = new Date(date);

  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 0) {
    return "just now";
  }

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval > 1 ? "s" : ""} ago`;
  }

  return `${Math.floor(seconds)} second${
    Math.floor(seconds) > 1 ? "s" : ""
  } ago`;
}

// TODO: make it use username if no first and last name
function Comment({ comment }) {
  return (
    <>
      <div className="d-flex flex-row mb-4">
        <div className="p-2 me-2">
          <Avatar
            icon="pi pi-user"
            size="xlarge"
            label={
              comment.user.first_name
                ? comment.user.first_name[0].toUpperCase()
                : comment.user.username[0].toUpperCase()
            }
            image={
              comment.user.profile_picture &&
              BASE_URL + comment.user.profile_picture
            }
            shape="circle"
            className="custom-avatar"
          />
        </div>
        <div className="p-1">
          {comment.user.first_name && comment.user.last_name ? (
            <h5 className="mb-0">{`${comment.user.first_name} ${comment.user.last_name}`}</h5>
          ) : (
            <h5 className="mb-0 text-capitalize mt-1">{`${comment.user.username}`}</h5>
          )}
          <span className="date mt-0 small">
            {comment && timeAgo(comment.date_created)}
          </span>
          <p className="text-black mb-2">{comment.description}</p>
          <div className="col-lg-5">
            <div className="d-flex flex-row">
              <CommentMedia images={comment.images} videos={comment.videos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
