import React from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { theme } from "@/style/theme";

import { ThemeMode } from "./ThemeMode";

import type { IThemeName } from "@/style/theme";
import type { ReactNode } from "react";

export type ThemeBaseProps = {
  children: ReactNode;
  themeName: IThemeName;
};

// https://mui.com/material-ui/guides/interoperability/#css-injection-order
export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const ThemeBase = ({ children, themeName }: ThemeBaseProps) => {
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
