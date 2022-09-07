# About this workspace

## Code

- react (hooks), Progressive Web App ready
- Redux
- materialUI
- @emotion with tss-react

## Structure

- whilst this is not a nextjs app the folder structure is intentionally designed to closely follow that of a nextjs app
- in nextjs 'Routes' are defined by the folder structure in 'pages' folder, so here we have Routes.jsx inside 'pages'
- in nextjs '\_app.tsx' is a special class inside 'pages', so here we have App.jsx inside 'pages'

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
