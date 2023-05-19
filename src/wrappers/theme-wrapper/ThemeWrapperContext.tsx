// useNameContext with contextType and no defaultValue:
// https://kentcdodds.com/blog/how-to-use-react-context-effectively#typescript

import React from "react";

type ThemeWrapperContextType = {
  toggleTheme: () => void;
};

export const ThemeWrapperContext = React.createContext<
  ThemeWrapperContextType | undefined
>(undefined);

export const useThemeWrapperContext = () => {
  const context = React.useContext(ThemeWrapperContext);
  /* istanbul ignore next */
  if (context === undefined) {
    throw new Error("useContext() must be used within <Context.Provider>");
  }
  return context;
};
