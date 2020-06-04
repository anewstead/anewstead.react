import React from "react";

const Thumbnail = ({ src, alt }) => {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Thumbnail;
