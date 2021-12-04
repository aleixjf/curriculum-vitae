/**
 * Import dependencies from node_modules
 * see commented examples below
 * import 'some-node-module';
 * import SomeModule from 'some-node-module';
 */

// Bootstrap
// https://getbootstrap.com/docs/5.1/getting-started/parcel/#importing-javascript
import * as bootstrap from 'bootstrap' //All components option

// Fontawesome
// We are importing it through main.scss, which is preferable.
// import "@fortawesome/fontawesome-free/js/all.js";

// Polyfill
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

// Welcome message on Console
(function () {
  console.log(`Hello, visitor!`);
})();
