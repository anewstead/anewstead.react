# Global
All code here is in global space. use wisely!  
Everywhere else in the app should use modules to prevent namespace clashes

## theme.ts
theme settings imported via base theme wrapper/provider

## gbl sass
scss variable, mixins, functions etc.  
@use needs to be reletive import  
(alias or root based imports are not yet well supported by other tools)
```
// scss
@use "../../style/gbl.scss";
.my-class{
  padding: gbl.$my-padding;
}
```
type-safe classes in .tsx via [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)  

```
// tsx
import cls from "./carouselButton.module.scss";
className={cls.***} // when type dot *** should be autocomplete suggestion
// inserts correct syntax for class names
className={cls.someClass} // camelCase
className={cls["my-class"]} // kebab-case
```

**DO NOT WRITE ANY UNWRAPPED CSS CLASSES IN GLOBAL SASS**  
Any css that is not wrapped by scss is automatically written into every consuming file  
Whereas sass only writes the output of a variable, mixins, function when used  
Whilst unwrapped css should ultimatly be de-duped at build time it is not good  
use of sass in global space, even after de-dupe due to hierarchy it may not act as you expect.
