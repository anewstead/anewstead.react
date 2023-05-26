### helpers
browser local storage:
theme name - init, get, set and toggle(light/dark)

### theme.styles
the actual theme styles and settings

### Theme
wraps children to provide specified theme
allows the theme to be used simply without state and context
(useful for creating a storybook decorator variation)

### ThemeWrapper
wraps the theme adding state context provider
(theme name and toggle function)

### ThemeWrapperContext
theme context setup

### ThemeMode
MUI CSSVarsProvider changes how dark/light themes are setup and toggled
ThemeProvider:
you set up a darkTheme and a lightTheme
you change the theme by passing one at a time on the provider itself
this meant having some state *outside* the provider to set/change the theme
A Context.Provider could be used to expose a toggle function to rest of the app
CSSVarsProvider:
dark and light are setup inside the same theme.
MUI introduced useColorScheme() hook
here you can only change theme from *within* the provider
ThemeMode Component:
sits within the CSSVarsProvider to capture themeName being passed in externally
it then passes themeName to useColorScheme.setMode()
*elsewhere in the app do not use useColorScheme.setMode()*
it will not work alongside ThemeMode Component
continue to set/toggle the same way as for ThemeProvider
