seemingly a lot of files but it separates concerns 
and hopefully make it easier to understand.

### helpers

browser local storage:
theme name - init, get, set and toggle(light/dark)

### theme.styles

the actual theme styles and settings

### Theme

wraps children to provide specified theme
this is the base setup, style providers e.g. styled components
allows the theme to be used simply without state and context
(useful for creating a storybook decorator variation)

### ThemeWrapper

wraps the theme adding state context provider
(theme name and toggle function)

### ThemeWrapperContext

theme context setup
