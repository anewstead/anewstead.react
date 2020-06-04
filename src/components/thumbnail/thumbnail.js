import React from "react";
import styles from "./thumbnail.module.scss";

const Thumbnail = (props) => {
  const { src, alt } = props;
  return (
    <div className={styles["thumbnail"]}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Thumbnail;
