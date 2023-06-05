import React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import ThemeMode from "./ThemeMode";
import theme from "../../style/global/theme";
import type { IThemeName } from "../../style/global/theme";

type Props = {
  children: ReactNode;
  themeName: IThemeName;
};

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const ThemeBase = ({ children, themeName }: Props) => {
  return (
    <CacheProvider value={muiCache}>
      <CssVarsProvider theme={theme}>
        <ThemeMode themeName={themeName} />
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  );
};

export default ThemeBase;
