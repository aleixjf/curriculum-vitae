/**
 * Import dependencies from node_modules
 * see commented examples below
 * import 'some-node-module';
 * import SomeModule from 'some-node-module';
 */

//Fontawesome (the Sass approach not working?)
import "@fortawesome/fontawesome-free/js/all.js";

//Polyfill
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

//Welcome message on Console
(function () {
  const university = "UOC";
  console.log(`Hello, ${university}!`);
})();
