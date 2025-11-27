import { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Col, Row } from "react-bootstrap";
import RecipeStepMedia from "./RecipeStepMedia";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { API_BASE_URL, BASE_URL } from "../../config/constants";

// plan is that images and videos will be passed as a list of
// integers, which are the IDs of the images and videos
// from the media component
const getImageUrl = (url) => {
  if (url.startsWith("/")) {
    return `${BASE_URL}${url}`;
  }
  return url;
};

// issue 1: video is not in formik state
// second issue was stuff not showing but its resolved now
// but check for video

function RecipeStep({
  step,
  handleStepChange,
  index,
  touched,
  errors,
  removeStep,
}) {
  const [images, setImages] = useState(step.images); // [{id: 1, url: "http://localhost:8000/media/recipes/1/1.jpg"}, ...]
  const [videos, setVideos] = useState(step.videos);

  const handleDeleteImage = (image) => {
    console.log("Delete image with id: " + image.id);

    // Delete it from the images state
    setImages(images.filter((img) => img.id !== image.id));
  };

  const handleDeleteVideo = (video) => {
    setVideos(videos.filter((v) => v.id !== video.id));
  };

  // whenever images or videos change,
  // update the main form using handleStepChange
  useEffect(() => {
    handleStepChange("images", images);
  }, [images]);

  useEffect(() => {
    handleStepChange("videos", videos);
  }, [videos]);

  return (
    <>
      <Col md={12}>
        <InputTextarea
          autoResize
          rows={2}
          id={`step-${index}`}
          className="recipe-form-input"
          placeholder={`Step Description`}
          value={step.description}
          onChange={(e) => handleStepChange("description", e.target.value)}
        />
        {touched && errors && errors[index] ? (
          <div className="text-danger">{errors[index].description}</div>
        ) : null}
      </Col>

      <Row className="mt-2">
        <Col md={4}>
          <label>Prep Time (Minutes)</label>
          <InputText
            placeholder="20"
            className="recipe-form-input"
            value={step.prep_time}
            type="number"
            onChange={(e) => handleStepChange("prep_time", e.target.value)}
          />{" "}
          {touched && errors && errors[index] ? (
            <div className="text-danger">{errors[index].prep_time}</div>
          ) : null}
        </Col>

        <Col md={4}>
          <label>Cook Time (Minutes)</label>
          <InputText
            placeholder="20"
            className="recipe-form-input"
            value={step.cook_time}
            onChange={(e) => handleStepChange("cook_time", e.target.value)}
            type="number"
          />{" "}
          {touched && errors && errors[index] ? (
            <div className="text-danger">{errors[index].cook_time}</div>
          ) : null}
        </Col>

        <Col md={4}>
          <RecipeStepMedia
            images={images}
            setImages={setImages}
            videos={videos}
            setVideos={setVideos}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {/* Render the previews of the images and videos */}
          {images.length > 0 && (
            <div className="images-bar mb-4">
              <p className="mb-1 mt-4">Attached Photos</p>
              {images.map((image, index) => (
                <div key={index} className="media-delete-overlay">
                  <Button
                    rounded
                    raised
                    className="media-delete-btn"
                    icon="pi pi-times"
                    severity="danger"
                    onClick={() => handleDeleteImage(image)}
                    type="button"
                  ></Button>
                  <Image
                    // src={image.image}
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
                    type="button"
                  ></Button>
                  <video
                    // src={video.video}
                    src={getImageUrl(video.video)}
                    // poster={`${process.env.PUBLIC_URL}/video_preview.png`}
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

export default RecipeStep;
