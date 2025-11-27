import { useState, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import useAuthToken from "../../hooks/useAuthToken";
import { Row, Col } from "react-bootstrap";
import { API_BASE_URL, BASE_URL } from "../../config/constants";

const getImageUrl = (url) => {
  if (url.startsWith("/")) {
    return `${BASE_URL}${url}`;
  }
  return url;
};

function RecipeMedia({ images, setImages, videos, setVideos }) {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useAuthToken();

  const triggerImageUpload = () => {
    imageInputRef.current.click();
  };

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    console.log(event.files);
    formData.append("image", event.target.files[0]);

    try {
      const response = await axios.post(
        `${API_BASE_URL}recipes/images/`,
        formData
      );
      if (response.status === 201) {
        setImages([...images, response.data]);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      alert("Sorry. Please only upload images less than 1MB in file size.");
    }

    event.target.value = "";
  };

  const triggerVideoUpload = () => {
    videoInputRef.current.click();
  };

  const handleVideoUpload = async (event) => {
    const formData = new FormData();
    console.log(event.files);
    formData.append("video", event.target.files[0]);

    try {
      const response = await axios.post(
        `${API_BASE_URL}recipes/videos/`,
        formData
      );
      if (response.status === 201) {
        setVideos([...videos, response.data]);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      alert("Sorry. Please only upload videos less than 5MB in file size.");
    }

    event.target.value = "";
  };

  const handleDeleteImage = (image) => {
    console.log("Delete image with id: " + image.id);

    // Delete it from the images state
    setImages(images.filter((img) => img.id !== image.id));
  };

  const handleDeleteVideo = (video) => {
    setVideos(videos.filter((v) => v.id !== video.id));
  };

  return (
    <>
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleVideoUpload}
      />

      <Button
        icon="pi pi-video"
        rounded
        text
        raised
        aria-label="Filter"
        size="small"
        className="mt-2 me-3"
        onClick={triggerVideoUpload}
        type="button"
      />

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <Button
        icon="pi pi-image"
        rounded
        text
        raised
        aria-label="Filter"
        size="small"
        className="mt-2 me-3"
        onClick={triggerImageUpload}
        type="button"
      />

      <Row className="mt-4">
        <Col md={12}>
          {/* Render the previews of the images and videos */}
          {images.length > 0 && (
            <div className="images-bar mb-4">
              <p className="mb-1">Attached Photos</p>
              {images.map((image, index) => (
                <div key={index} className="media-delete-overlay">
                  <Button
                    rounded
                    raised
                    className="media-delete-btn"
                    icon="pi pi-times"
                    severity="danger"
                    onClick={() => handleDeleteImage(image)}
                  ></Button>
                  <Image
                    src={getImageUrl(image.image)}
                    // key={index}
                    width={150}
                    height={150}
                    className="me-2 custom-avatar"
                  />
                </div>
              ))}
            </div>
          )}

          {videos.length > 0 && (
            <div className="images-bar">
              <p className="mb-1">Attached Videos</p>
              {videos.map((video, index) => (
                <div key={index} className="video-delete-overlay">
                  <Button
                    rounded
                    raised
                    className="video-delete-btn"
                    icon="pi pi-times"
                    severity="danger"
                    onClick={() => handleDeleteVideo(video)}
                  ></Button>
                  <video
                    src={getImageUrl(video.video)}
                    height="150px"
                    className="me-2"
                    controls
                    style={{ marginTop: "0px", borderRadius: "5px" }}
                  />
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default RecipeMedia;
