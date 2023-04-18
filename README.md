# anewstead-cra-mui

[https://anewstead-cra-mui.netlify.app/](https://anewstead-cra-mui.netlify.app/)

Portfolio site that shows a few of the projects I've worked on.  
The underlaying code is just as important, maybe more so as its a great way to see how i write.  
I often use this space to try out different coding methods.  
It has gone through many iterations but the design delibratly changes very little as  
it serves to ensure I recreate the same thing with different technologies.  


-----  
# Setup
nvm - https://github.com/nvm-sh/nvm  
manages which version of node is used  
Ensure //.zshrc is correct as per NVM install instructions  
(// = root of user folder on mac)  

pnpm - https://pnpm.io/  
install by `npm i -g pnpm` as easier to apply future updates vs `iwr/curl/wget`  
ensure pnpm has updated //.zshrc with its PATH  
https://github.com/pnpm/pnpm/issues/4027

huskyrc - https://typicode.github.io/husky/#/?id=command-not-found  
you need a //.huskyrc file so husky knows where to find node installed by nvm

vscode is preferred IDE  
see .vscode/README.md for more information

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
Meaning each **page** acts as a data layer with absolute minimum JSX markup,  
I.E. it should pass through data to other component.  
E.G. website.com/about = src/pages/about > instantiates > src/layout/about ...and so on  

In a standard React/ non-NextJs App we simply follow the same concept and folder names.

# Testing 
- Unit - an item concerned with just one thing, mock data/services
- Integration - a combination of units, mock data/services
- E2E - the full app (part of / process within it), real data/services

we unit test a *function* in abstract by itself  
we then use that *function* in a *component*, and integration test  
but that *component* should itself be a unit, from the perspective of *consumingComponent*  
ie. could be unit tested in abstract by itself  
this should flow upward as *component* is to *consumingComponent* is to *page* is to *app*   
At the top (the app) we run end-to-end tests on specific user journeys  

  
#### Does it display?
In practice write/spearate code based on this point.  
Principally *always* look to separate **logic** from **display**  
so regardless of display the logic remains pure and reusable.  
By extention always separate **content** from **layout**  
because content is just variable data in a template  
#### Functional - file.test.{js,ts} 
**Not for display** (by itself), logic, geting, setting, manipulating.  
Output is a value e.g. Bool, String, Array, Object etc.  
Jest & React testing library (RTL), JSDOM inc. mocked window and localstorage  
RTL purely for testing react hooks.  

#### Components - file.stories.{jsx,tsx}  
**For display**, inseparable display based logic, interaction and animation,  
Output is valid display markup.  
Jest & Playwright via Storybook test-runner  
(inc. React testing library under the hood)

note.  
Its possible to use the Functional test setup to test jsx output against JSDOM.  
But, in most cases it's not enough and we likely duplicate effort at another level of testing.  
Testing in browser(s) with storybook gives more options.  
At scale consider integrating this with cloud based automation  
e.g. chromatic, browserstack, lambdatest   


#### Code Coverage

Because we run 2 test suites we have 2 coverage outputs,  
one for pure functions (js) one for display components (jsx).  

Where jsx imports functions from js those will also be in the jsx coverage.  
*This is not duplication!*  
The jsx coverage may show different metrics for the js vs. its own coverage.  
This is unit vs. integration testing and ensures correct use of a unit,  
particularly this highlights where an imported unit has switching logic (if/else),  
and the consuming code is expected to handle those variations (and have tests against them). 

e.g.
against the same function:  
the unit test might expect boolean (success | fail)  
the integration test might expect display (image | errorMsg)  

#### NPM scripts
- `test-js` - unit test ts/js (jest)  
- `test-sb` - unit & integration test tsx/jsx, requires storybook running on localhost:6006  
- `test` - runs `test-sb` > `test-js` > `cover`, requires storybook running on localhost:6006
- `e2e` - requires app running on localhost:3003


