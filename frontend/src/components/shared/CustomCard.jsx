import React from "react";
import "../../styles/custom-card.css";

function CustomCard({ title, children, bodyClass }) {
  return (
    <div class="card mt-4 custom-card">
      {title && (
        <div class="card-header">
          <h4 class="card-header-title">{title}</h4>
        </div>
      )}

      <div class={`card-body ${bodyClass && bodyClass}`}>{children}</div>
    </div>
  );
}

export default CustomCard;
