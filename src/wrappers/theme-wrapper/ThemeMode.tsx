import React, { memo, useEffect } from "react";
import { useColorScheme } from "@mui/material";

import type { IThemeName } from "./theme";

type Props = {
  themeName: IThemeName;
};

const ThemeMode = ({ themeName }: Props) => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    if (mode !== themeName) {
      setMode(themeName);
    }
  }, [mode, setMode, themeName]);

  return <></>;
};

export default memo(ThemeMode);
