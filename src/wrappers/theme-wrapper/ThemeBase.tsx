import React from "react";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import ThemeMode from "./ThemeMode";
import styles from "./theme";
import type { IThemeName } from "./theme";

type Props = {
  children: ReactNode;
  themeName: IThemeName;
};

const ThemeBase = ({ children, themeName }: Props) => {
  return (
    <CssVarsProvider theme={styles}>
      <ThemeMode themeName={themeName} />
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};

export default ThemeBase;
