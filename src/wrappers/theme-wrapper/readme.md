 # Theme wrapper

seemingly a lot of files but it separates concerns and hopefully make it easier to understand.

### helpers

init, get, set and toggle theme name in browser local storage

### theme.styles

light and dark theme styles/settings

### Theme

component wraps children to provide specified theme
(allows for theme to be used simply without state and context)

### ThemeWrapper

wraps the theme adding theme name state and toggle function to theme context provider

### ThemeWrapperContext

theme context setup
