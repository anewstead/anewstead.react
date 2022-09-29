# About this workspace

## Code

- React (hooks),
- Redux
- materialUI
- @emotion with tss-react
- Progressive Web App ready
- testing with Jest and React Testing Library

## Structure

Whilst this is not a NextJs App, the file structure intentionally follows that with regard to 'pages' folder.  
Nextjs Routes are defined by the contents of the resevered folder 'src/pages'.  
So here 'src/pages' is used only for our top level 'App' and 'AppRoutes' components,  
the actual page content is in 'src/page' folder  

Side note.  
In a nextJs app we use the same pages/page folder split to separate concerns,  
'pages' files define routes, handle SSR realted code only, instanciate namesake layout from 'page' passing through SSR data.  
E.G. src/pages/about (gets SSR data) > instanciates src/page/about (layout)  

## IDE/Editor

- VSCode was used to create so is preferd.
- Important; see /.vscode/README.md

## npm/packages

- Dependencies: production code
- DevDependencies: dev environment e.g. compiler, linting

## git:

- filesnames are case sensitve

## git hooks (husky):

- pre-commit: lint and prettier all src code
- post-merge: prompt to run npm install if packages-lock.json has changed

## prettier:

- default config, why mess with their years of working out what works

## eslint:

- extends airbnb (extensive and well regarded)
- minimal rules added to reinforce prettier and react
- enforce folder/file name conventions

## stylelint:

- almost default
- minimal rules added to reinforce prettier, allow @rules and css-in-js/styled components

## typescript

- jsxImportSource: @emotion for extra default class attributes
