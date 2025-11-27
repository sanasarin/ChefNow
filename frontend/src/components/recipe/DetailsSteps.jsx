import React from "react";
import { BASE_URL } from "../../config/constants";
import RecipeCarousel from "./RecipeCarousel";

function DetailsSteps({ steps }) {
  const renderStep = (step, index) => {
    return (
      <div className="row mt-4 mb-5" key={index}>
        <div className="col-lg-7 mt-4">
          <p>
            <b>Step {index + 1}</b> <br />
            <div className="mb-4">{step.description}</div>
            {step.prep_time && (
              <>
                <small>
                  <i>Prep time: {step.prep_time} minutes</i>
                </small>
              </>
            )}
            {step.cook_time && (
              <>
                <br />
                <small>
                  <i>Cook time: {step.cook_time} minutes</i>
                </small>
              </>
            )}
          </p>
        </div>

        <div className="col-lg-5">
          <RecipeCarousel
            images={step.images}
            videos={step.videos}
            dynamicHeight={false}
            className="mt-4"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="row mt-4 recipe-details__instructions">
      <h3>Instructions</h3>
      <div>{steps && steps.map(renderStep)}</div> {/**  col-lg-8 */}
    </div>
  );
}

export default DetailsSteps;
