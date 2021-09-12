import { Container, Paper, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import React from "react";
import { useSelector } from "react-redux";

import Carousel from "../components/Carousel";
import { IRootState } from "../lib/Store";
import { IMainData } from "../lib/Store.types";
import useStyles from "./Gallery.style";

type IGallery = {
  data: IMainData;
};
const Gallery: React.FC<IGallery> = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  const alt = `${data.brand} ${data.project}`;

  const slides = data.view.stills.map((obj, i) => {
    const url = `${baseContentURL}img/gallery/${obj}`;
    return <img src={url} alt={`${alt} ${i}`} key={obj} />;
  });

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  return (
    <Container className={classes.root} style={{ maxWidth: data.view.width }}>
      <Carousel slides={slides} />
      <Paper className={classes.info}>
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          align="justify"
        >
          {info}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Gallery;
