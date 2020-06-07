import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Footer from "../../components/footer/footer";
import HeaderNavDetail from "../../components/header-nav-detail/header-nav-detail";
import HeaderNavMain from "../../components/header-nav-main/header-nav-main";
import { NAV_CHECKBOX_CHANGE, TOGGLE_THEME } from "./store";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100vh",
      minWidth: "320px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flexGrow: 1,
      display: "flex",
    },
    mainAndFooterWrapper: {
      overflow: "auto",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
  };
});

const withLayout = (PageComponent) => {
  return (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const headerNav = props.headerNav || "main"; // e.g. <Home headerNav='detail' />

    const navBrand = useSelector((state) => {
      return state.app.nav.brand;
    });

    const navCheckboxes = useSelector((state) => {
      return state.app.nav.checkboxes;
    });

    const backClick = () => {
      history.push("/");
    };

    const brandClick = () => {
      history.push("/about");
    };

    const themeClick = () => {
      dispatch(TOGGLE_THEME());
    };

    const checkboxChange = (e) => {
      const payload = { id: e.target.id, checked: e.target.checked };
      dispatch(NAV_CHECKBOX_CHANGE(payload));
    };

    let nav;
    switch (headerNav) {
      case "detail":
        nav = (
          <HeaderNavDetail
            brandName={navBrand}
            onBackClick={backClick}
            onThemeClick={themeClick}
          />
        );
        break;

      default:
        nav = (
          <HeaderNavMain
            brandName={navBrand}
            checkboxData={navCheckboxes}
            onBrandClick={brandClick}
            onThemeClick={themeClick}
            onCheckboxChange={checkboxChange}
          />
        );
        break;
    }

    return (
      <Box className={classes.root}>
        {/* NAV */}
        {nav}
        <div className={classes.mainAndFooterWrapper}>
          <main className={classes.main}>
            <PageComponent {...props} />
          </main>
          <Footer brand={navBrand} />
        </div>
      </Box>
    );
  };
};

export default withLayout;
