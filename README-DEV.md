# About this workspace

## Code

- React (hooks),
- Redux
- materialUI
- @emotion with tss-react
- Progressive Web App ready
- testing with Jest and React Testing Library

## Structure

Whilst this is not a NextJs App, the file structure intentionally follows that with regard to pages folder.  
Nextjs Routes are defined by the contents of 'src/pages' folder.  
So here 'src/pages' is used only for our 'App' and 'AppRoutes' components,  
the actual page content is in 'src/page' folder  

Note.  
In a nextJs app we separate the concerns of SSR specific code into 'src/pages',  
these then instanciate namesake page content/layout from 'src/page' passing through any SSR realted data.  
src/pages/home (gets SSR data) > instanciates src/page/home (layout)  
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
