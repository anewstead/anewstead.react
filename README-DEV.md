# About this workspace

## Code

- react (hooks), Progressive Web App ready
- Redux
- materialUI
- @emotion with tss-react

## Structure

the file structure is intentionally designed with nextjs in mind to allow for its reserved files and folder names.
it doesn't hurt to follow this in a standard react/ non nextjs app, and should you ever need to refator to either it really helps.

in nextjs Routes are defined by the folder structure within 'src/pages' folder
here we retain 'src/pages' folder and add AppRoutes.jsx inside
all page content is under 'src/page' folder

in nextjs 'src/pages/\_app.tsx' is the top-most class, with 'src/pages/index.jsx' being the default/homepage
here 'src/index.tsx' is our top-most class we have a 'src/pages/App.jsx/

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
