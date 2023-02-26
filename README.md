# anewstead-cra-mui

[https://anewstead-cra-mui.netlify.app/](https://anewstead-cra-mui.netlify.app/)

Portfolio web app:

1. Show some of the projects I have developed
2. Have some non-client code others can review

-----  
# Setup
nvm - https://github.com/nvm-sh/nvm  
use NVM to manage which version of node is used  
Ensure ~/.zshrc is correct as per NVM install instructions  
(~ = root user folder on mac)  

pnpm - https://pnpm.io/  
use pnpm! npm and yarn probably work but are not tested here  
pnpm is (IMO) best installed by `npm i -g pnpm`  
ensure pnpm has updated ~/.zshrc with its PATH  
https://github.com/pnpm/pnpm/issues/4027

note. pnpm can manage node version installs instead of nvm, however we use nvm because it can be used across multiple projects that may require npm or yarn.

huskyrc - https://typicode.github.io/husky/#/?id=command-not-found  
you need a ~/.huskyrc file so husky knows where to find node installed by nvm

vscode is the preferred IDE  
see .vscode/README.md for more information

## Code

- Typescript
- React (hooks),
- Redux (toolkit)
- MaterialUI
- @emotion with tss-react
- Testing with Jest and React Testing Library
- Storybook

## Structure
#### "pages" & "content" folders
In nextjs the `pages` folder is reserved to define routes.  
It is also the only location where you handle SSR related code I.E. load page data to be static rendered.  
Building on this convention we can implicitly separate concerns of page data from page layout.  
Meaning each `page` acts as the data layer with absolute minimum markup essentially it should instantiate `content` or `layout` component passing through the data.  
E.G. website.com/about = src/pages/about > instantiates > src/content/about  

In a non-NextJs App we simply follow the same folder setup to separate data and layout the same way.



