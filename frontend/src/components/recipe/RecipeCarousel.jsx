import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BASE_URL } from "../../config/constants";

function ImageCarousel({
  images = [],
  videos = [],
  autoPlay = true,
  showThumbs = false,
  dynamicHeight = true,
}) {
  return (
    <Carousel
      autoPlay={autoPlay}
      infiniteLoop
      interval={5000}
      showStatus={false}
      showThumbs={showThumbs}
      dynamicHeight={dynamicHeight}
    >
      {images &&
        images.map((img, index) => (
          <div key={index}>
            <img
              src={BASE_URL + img.image}
              alt={`recipe-img-${index}`}
              className="rounded recipe-detail-image"
            />
          </div>
        ))}

      {videos.map((video, index) => (
        <div key={`vid-${index}`}>
          <video
            src={BASE_URL + video.video}
            controls
            className="rounded recipe-detail-image"
            style={{ width: "270px" }}
            autoPlay
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
