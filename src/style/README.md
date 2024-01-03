# Global

All code here is in global space. use wisely!  
Everywhere else in the app should use modules to prevent namespace clashes

## theme.ts

theme settings imported via base theme wrapper/provider

## gbl sass

scss variable, mixins, functions etc.

SCSS NOTE:
Alias @ path is not supported by vscode & ext for code completion  
Alias works in vite and compiles fine, but is a no go without code completion  
Current best option to use absolute path in scss i.e. "/src/..."  
This gives vscode code completion, but then need to alias it for vite  
"/src/" to "./src/"  
We can do this because "/" in scss refer to project root,  
And in typescript "/" defaults to HD root, so is never used there  
otherwise @use needs to be relative e.g "../../../styles/file.scss"

Support may be coming for scss paths in 2024:\

- https://github.com/microsoft/vscode/issues/163967\
- https://github.com/wkillerud/vscode-scss/issues/41

```
// scss
@use "/src/style/gbl.scss";
.my-class{
  padding: gbl.$my-padding;
}
```

type-safe classes in .tsx via [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)

```
// tsx
import css from "./carouselButton.module.scss";
className={css.***} // when type dot *** should be autocomplete suggestion
// inserts correct syntax for class names
className={css.someClass} // camelCase
className={css["my-class"]} // kebab-case
```

**DO NOT WRITE ANY UNWRAPPED CSS CLASSES IN GLOBAL SASS**  
Any css that is not wrapped by scss is automatically written into every consuming file  
Whereas sass only writes the output of a variable, mixins, function when used  
Whilst unwrapped css should ultimatly be de-duped at build time it is not good  
use of sass in global space, even after de-dupe due to hierarchy it may not act as you expect.
