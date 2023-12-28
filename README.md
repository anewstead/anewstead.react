# anewstead-react

**Website**:  
[https://anewstead-react.netlify.app/](https://anewstead-react.netlify.app/)

**Storybook**:  
[https://anewstead-react-sb.netlify.app/](https://anewstead-react-sb.netlify.app/)

Portfolio site to show some of the projects I've worked on.  
It has gone through many iterations using different coding methods/libraries  
with the design delibratly changing very little as  
it serves to ensure I recreate the same thing with different technologies.

---

# Setup

nvm - https://github.com/nvm-sh/nvm  
manages which version of node is used  
Ensure $HOME/.zshrc is correct as per NVM install instructions  
($HOME a.k.a user's root folder on mac)

pnpm - https://pnpm.io/  
install by `npm i -g pnpm` easier to update later on vs. `iwr/curl/wget`  
because we use nvm you need to ensure $HOME/.zshrc has the correct pnpm path  
https://github.com/pnpm/pnpm/issues/4027

```
export PNPM_HOME="$HOME/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
alias pn=pnpm
```

huskyrc - https://typicode.github.io/husky/#/?id=command-not-found  
because we use nvm you need a $HOME/.huskyrc file  
this lets husky knows where to find the current node install

vscode is preferred IDE  
see .vscode/README.md for more information

# Code

- Typescript
- React (hooks),
- Redux (toolkit)
- MaterialUI
- Jest, React Testing Library, Playwright
- Storybook
- Hygraph CMS, GraphQL

# Structure

### "pages" vs "content"

In NextJs the **pages** folder is reserved to define routes.  
It's also where you load server side content/data to be static rendered.  
Building on this we implicitly separate page data from page display.  
Meaning each **page** file acts as a data layer with absolute minimum JSX markup,  
I.E. it passes data to other display component.  
E.G. website.com/about = src/pages/about > instantiates > src/layout/about ...and so on

In a standard React/ non-NextJs App we simply follow the same concept and folder names.

