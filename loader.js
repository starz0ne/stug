// ==UserScript==
// @name         SHIM Loader
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  A userscript to assemble SHIM by injecting all of it's files
// @author       starzonenya
// @match        https://stug.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stug.io
// @grant        none
// ==/UserScript==

(async function() {
   'use strict';
   async function fetchfile(link) {
      let request = await fetch(link);
      let content = await request.text();
      return content;
   } function container(type, content) {
      console.log('[loader.js:shim] container created! ('+type+')')
      let element = document.createElement(type);
      element.innerHTML = content;
      return element;
   }

   // Define file locations
   const repository = 'https://raw.githubusercontent.com/starzonenya/stug/master'
   const folder = '/dev'

   // Inject HTML
   var html = await fetchfile(repository+folder+'/ui/container.html');
   document.body.appendChild(container('div', html));
   console.log('[loader.js:shim] injected container.html (1/4)');

   // Inject CSS
   var css = await fetchfile(repository+folder+'/ui/style.css');
   document.head.appendChild(container('style', css));
   console.log('[loader.js:shim] injected style.css (2/4)');

   // Inject JS
   var render = await fetchfile(repository+folder+'/ui/render.js');
   var exploit = await fetchfile(repository+folder+'/exploit.js');
   document.head.appendChild(container('script', render));
   console.log('[loader.js:shim] injected render.js (3/4)');
   document.head.appendChild(container('script', exploit));
   console.log('[loader.js:shim] injected exploit.js (4/4)');

})();