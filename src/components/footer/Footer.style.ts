import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      height: "48px",
    },
  };
});

export default useStyles;
