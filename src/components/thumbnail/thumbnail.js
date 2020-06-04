import styles from './thumbnail.module.scss';

import React from 'react';

const Thumbnail = (props) => {
  const { src, alt } = props;
  return (
    <div className={styles['thumbnail']}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Thumbnail;
