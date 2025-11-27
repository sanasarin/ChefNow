import React, { useState } from "react";
import { Image } from "primereact/image";
import { Modal } from "react-bootstrap";
import { BASE_URL } from "../../config/constants";

function CommentMedia({ images = [], videos = [] }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(null);

  const openVideoModal = (videoSrc) => {
    setCurrentVideoSrc(videoSrc);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setCurrentVideoSrc(null);
    setVideoModalOpen(false);
  };

  return (
    <>
      {images.map((img, index) => (
        <Image
          key={index}
          src={BASE_URL + img.image}
          alt={`comment-img-${index}`}
          preview
          width="100px"
          height="100px"
          template={`View`}
          className="me-2"
          style={{ cursor: "pointer" }}
        />
      ))}
      {videos.map((video, index) => (
        <div
          className="video-thumbnail me-2"
          onClick={(e) => {
            e.preventDefault();
            openVideoModal(BASE_URL + video.video);
          }}
        >
          <video
            key={`vid-${index}`}
            src={BASE_URL + video.video}
            muted
            style={{ cursor: "pointer", height: "100px", borderRadius: "5px" }}
          />
          <div className="overlay"></div>
        </div>
      ))}
      <Modal show={videoModalOpen} onHide={closeVideoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentVideoSrc && (
            <video src={currentVideoSrc} controls width="100%" autoplay muted />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CommentMedia;
