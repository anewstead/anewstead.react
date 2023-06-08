# Global
All code here is in global space.  
Everywhere else in the app should use modules to prevent namespace clashes

## theme.ts
theme settings imported via base theme wrapper/provider

## sass
scss variable, mixins, functions etc,  
Index file imported in all scss file via webpack/vite pre-processor  
```
preprocessorOptions: {
  scss: {
    additionalData: `@use "/src/style/sass/" as *;`,
  },
}
```
uses modern sass @use/@forward but intentionally added to all as '*'  
this means there is no namespace and behaves as if legacy sass@import  
this also allows this sass to correctly list in autocomplete/intellisense  
(vscode plugin required)

**DO NOT WRITE ANY UNWRAPPED CSS CLASSES IN GLOBAL SASS**  
Any css that is not wrapped by scss is automatically written into every consuming file  
Whereas sass only writes the output of a variable, mixins, function when used  
Whilst unwrapped css should ultimatly be de-duped at build time it is not good 
use of sass in global space, even after de-dupe due to hierarchy it may act as you expect.
