# global

Global styles  
Index imported once at the root/app level

# sass

Global scss variable, mixins, functions etc,  
Index imported by webpack/vite pre-processor so available to all scss file  
note that this is intentionally '*' so there is no namespace for globals
also makes sure they are correctly listed in autocomplete/intellisense
E.g.
```
preprocessorOptions: {
  scss: {
    additionalData: `@use "/src/style/sass/" as *;`,
  },
}
```

**DO NOT WRITE ANY UNWRAPPED CSS CLASSES IN GLOBAL SASS**

Any css that is not wrapped by scss is automatically written into every consuming file

Whereas scss only writes the output of a variable, mixins, functions etc when used

Whilst unwrapped css might be largly de-duped at build time  
it is not intended use, is not guaranteed and may lead to errors.
