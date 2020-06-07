import { Container, makeStyles } from "@material-ui/core";
import React from "react";

import Layout from "../app/withLayout";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
  };
});
const About = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas magna
        sem, imperdiet vel vestibulum id, pretium nec ante. Nulla facilisi. Sed
        rhoncus commodo blandit. Vivamus hendrerit justo vitae dictum aliquet.
        Nullam dictum efficitur libero id congue. Nulla hendrerit tortor nec
        pharetra ornare. Sed interdum ligula vitae quam lobortis, ut molestie
        sem pretium. Nunc lobortis mauris tristique gravida sollicitudin.
        Aliquam tristique ullamcorper consequat. Vivamus ac sollicitudin mi.
        Nunc ut tellus ac lacus ullamcorper ornare in at ligula.
      </p>
      <p>
        Ut imperdiet ullamcorper purus vitae ullamcorper. Aliquam pretium neque
        felis, ut aliquet odio viverra sit amet. Curabitur pharetra fringilla
        vestibulum. Donec erat felis, mattis tincidunt porttitor ut, ornare at
        lacus. Cras porttitor nulla vel est congue, vel convallis orci lobortis.
        Praesent laoreet massa nec elit fringilla, nec suscipit est blandit.
        Praesent lobortis consectetur auctor. Aenean a tellus ultricies, cursus
        nisi vitae, euismod est. Nulla id blandit ex. Ut accumsan, felis vitae
        laoreet mattis, ex orci feugiat enim, vel pulvinar nulla sem non urna.
        Vestibulum convallis mauris a euismod commodo. Vestibulum ante ipsum
        primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris
        eget lobortis enim.
      </p>
    </Container>
  );
};

export default Layout(About);
