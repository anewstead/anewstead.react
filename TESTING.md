# Testing 

Always think about separating content, business logic and display code.  
There are 2 unit test suites and 2 coverage outputs,  
- `pnpm test-js` - Functional (js)
- `pnpm test-sb` - Display (jsx).  

**Aim for 100% coverage from both suites**

-----

### Its all perspective!
- Unit - one thing, tested in abstract by itself, mock data/services
- Integration - a combination of units, mock data/services
- E2E - the full app (a process within it), real data/services

we have a *function*, we unit test it in abstract by itself  
we use that function in a display *component* and test the component...  
but the display component is also a unit, testable by itself in abstact.  
A unit test for the component but an integration test for the function  
Potentially this flows upward: *function* > *class* > *component* > *consumingComponent* > *page* > *app*  
At the top (the app) we are end-to-end testing...  
although even app might be considered a unit from an operating system perspective  
  
### Does it display? 
Principally *always* look to separate **logic** from **display**  
so regardless of display the logic remains pure and reusable.  
By extention always separate **content** from **layout**  
because content is just variable data to a template  

### Functional test - file.test.{js,ts} 
**Not for display** (by itself), logic, geting, setting, manipulating.  
Output is a value e.g. Bool, String, Array, Object etc.  
Jest & React testing library (RTL), JSDOM inc. mock window and localstorage  
RTL purely for testing react hooks.  

### Component test - file.stories.{jsx,tsx}  
**For display**, inseparable display based logic, interaction and animation,  
Be mindful if code can be separated to js.  
Output is valid display markup.  
Jest, React testing library & Playwright via Storybook and its test-runner  

note.  
The Functional test could be used to test jsx output against JSDOM.  
But this doesnt give us enough and we would end up duplicating effort later on testing in browser(s)  
Going strainght to browser via storybook gives all those options and more  
At scale consider integrating this with cloud based automation  
e.g. chromatic, browserstack, lambdatest  

## Code Coverage
Code coverage should only come from unit tests.  
There are 2 unit test suites and 2 coverage outputs,  

- Functional (js)
- Display (jsx)  

Explicitly jsx coverage has been set to not cover js files  
**Aim for 100% coverage from both suites**
 
#### Not by Integration  
Code coverage should come from unit tests **not** from integration tests.  
Default storybook test-runner behaviour includes any touched file for coverage  
E.G. where a display component imports a js *function* that functions js *file* is included for coverage,  
technically that is an integration test of the function, more annoyingly to be clear its the  
entire imported file's code that is covered not just the imported bit.  

**This is not what we want, hence the 2 levels of testing**  

If we tired to get 100% coverage using only default storybook test-runner output,  
we would have to integration test the whole of any imported js file.  
I.E. create integration test for functions we may not be not using,  
like if the js file is a wider utility class we just use a bit of.  
(the build setup should tree-shake those unused code in compilation)  
Further, because it's an integration test of a function  
instead of being pure e.g. check it returns (success | fail)  
it becomes secondary via display e.g. does it render (image | errorMsg)

