import React, { memo, useEffect } from "react";

import { useColorScheme } from "@mui/material";

import type { IThemeName } from "../../style/theme";

type Props = {
  themeName: IThemeName;
};

export const ThemeMode = memo(({ themeName }: Props) => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    if (mode !== themeName) {
      setMode(themeName);
    }
  }, [mode, setMode, themeName]);

  return <></>;
});
