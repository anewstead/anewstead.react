### shared.scss

is included in all scss files via webpack config
so that variables and mixins are available throughout

try to avoid using scss to include simple reusable code where instead a higher level class would do
e.g. use class='primary-h1 etc' in markup instead of @include 'primary-h1' into scss rules

### root.scss

import into index.js
import './assets/styles/root.scss'

### node_modules

to import styles from node_modules use '~'
wrong: @import '../../node_modules/vendor/vendor.css'
right: @import '~vendor/vendor.css';
