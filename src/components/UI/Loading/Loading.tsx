import React, { memo } from "react";
import "./Loading.scss";

const Loading = memo(() => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
});

export default Loading;
