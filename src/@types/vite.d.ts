/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* 
we can add (merge) to vite ImportMeta/ImportMetaEnv because they are "interface",  
this could not be done if they were "type"
*/

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
