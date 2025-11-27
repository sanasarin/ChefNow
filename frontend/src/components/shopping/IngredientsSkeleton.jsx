import React from "react";
import { Skeleton } from "primereact/skeleton";

function IngredientsSkeleton() {
  return (
    <ul className="m-0 p-0 shopping-list-skeleton">
      <li className="mb-4 mt-1">
        <div className="d-flex">
          <div style={{ flex: "1" }}>
            <Skeleton width="100%" className="mt-3"></Skeleton>
            <Skeleton width="75%" className="mt-3"></Skeleton>
          </div>
        </div>
      </li>

      <li className="mb-4 mt-5">
        <div className="d-flex">
          <div style={{ flex: "1" }}>
            <Skeleton width="100%" className="mt-3"></Skeleton>
            <Skeleton width="75%" className="mt-3"></Skeleton>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default IngredientsSkeleton;
