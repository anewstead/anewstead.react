# anewstead-cra-mui

[https://anewstead-cra-mui.netlify.app/](https://anewstead-cra-mui.netlify.app/)

Portfolio site that shows a few of the projects I've worked on.
The underlaying code is just as important, maybe more so!
I use this space to try out different coding methods.  
It has gone through many iterations but the design delibratly changes very little as it serves to ensure I recreate the same thing with different technologies.  


-----  
# Setup
use nvm - https://github.com/nvm-sh/nvm  
manages which version of node is used  
Ensure ~/.zshrc is correct as per NVM install instructions  
(~ = root user folder on mac)  

use pnpm - https://pnpm.io/  
install by `npm i -g pnpm` as easier to apply future updates vs `iwr/curl/wget`  
ensure pnpm has updated ~/.zshrc with its PATH  
https://github.com/pnpm/pnpm/issues/4027

note. pnpm can manage node version but nvm can also be used in other projects that may use npm or yarn.

huskyrc - https://typicode.github.io/husky/#/?id=command-not-found  
you need a ~/.huskyrc file so husky knows where to find node installed by nvm

vscode is preferred IDE  
see /.vscode/README.md for more information

# Code
- Typescript
- React (hooks),
- Redux (toolkit)
- MaterialUI
- @emotion with tss-react
- Jest, React Testing Library, Playwright
- Storybook

# Structure
### "pages" vs "content"
In NextJs the **pages** folder is reserved to define routes.  
It's also where you load server side content/data to be static rendered.  
Building on this we implicitly separate page data from page display.  
Meaning each **page** acts as a data layer with absolute minimum JSX markup, maybe including just a single **layout** component and passing through data for it to display.  
E.G. website.com/about = src/pages/about > instantiates > src/layout/about  

In a standard React/ non-NextJs App we simply follow the same concept and folder names.

# Testing

- Unit - an item concerned with just one thing, mock data/services
- Integration - a combination of units, mock data/services
- E2E - the full app (a part/process within it), real data/services

OK, but perhaps more critical especially on the front end is:  

**Does it display?**  

Meaning *always* separate **business** logic from **display** logic,  
and by extention always separate **content** from **layout**  
(because content is essentially data i.e. variable in a template)

#### Functional - file.test.{js,ts} 
**Not for display** (on its own), business logic, geting, setting, manipulating raw content/data.  
Output is a value e.g. Bool, String, Array, Object etc.  
Jest & jsdom inc. window and localstorage (optionally can switch to node)  
React testing library included but intended purely for testing react hooks.  

#### Components - file.stories.{jsx,tsx}  
**For display** and display based logic, interaction and animation.  
Output is valid display markup.  
Jest & Playwright via storybook test-runner.

