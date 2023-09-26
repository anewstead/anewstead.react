# Testing

#### Important read concepts section below

There are 2 unit test suites and 2 coverage outputs,

- `pnpm test-js` - Functional (js)
- `pnpm test-sb` - Display (jsx).

**Aim for 100% coverage from both suites**

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
The Functional test could be reconfigured to test jsx output against JSDOM.  
But this doesnt give us enough and we would end up duplicating effort later on testing in browser(s)  
Going strainght to browser via storybook gives all those options and more  
At scale consider integrating this with cloud based automation  
e.g. chromatic, browserstack, lambdatest

---

# Concepts

### Test perspective

- Unit - one thing, tested in abstract by itself, mock data/services
- Integration - a combination of units, mock data/services
- E2E - the full app (a process within it), real data/services

we have a _function_, we unit test it in abstract by itself  
we use that function in a display _component_ and test the component...  
but the display component can also be a unit, testable by itself in abstact.  
This is a unit test for the component but an integration test for the function  
Potentially this flows upward: _function_ > _class_ > _component_ > _consumingComponent_ > _page_ > _app_  
At the top (the app) we are end-to-end testing...  
even the app might be considered a unit from an operating system perspective  
i.e. the o/s is only concerned each app unit fulfills certain generic criteria

### Does it display

Principally _always_ look to separate **logic** from **display**  
so regardless of display the logic remains pure and reusable.  
By extention always separate **content** from **layout**  
because content is just variable data to a template

### Unit coverage only

Code coverage should come from unit tests **not** from integration tests.  
Default storybook test-runner behaviour includes any touched file for coverage  
E.G. where a display component imports a js _function_ that functions js _file_ is included for coverage,  
technically that is an integration test of the function, more annoyingly its the  
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

#### Just in case

To exclude the next line/statement of code from coverage:  
`/* istanbul ignore next -- @preserve */`
