import React, { memo } from "react";
import Loading from "./Loading";
import "./Loading.scss";
const LoadingFull = memo(() => {
  return (
    <div className="loading__wrapper">
      <Loading></Loading>
    </div>
  );
});

export default LoadingFull;
