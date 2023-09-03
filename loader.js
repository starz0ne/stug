// ==UserScript==
// @name         SHIM Loader
// @namespace    http://tampermonkey.net/
// @version      1.4
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
   } function message(level, content) {
      switch (level) {
         case 'error':
            console.error('[loader.js] => { '+content+' }')
            break;
         case 'warning':
            console.log('[loader.js] => [ '+content+' ]')
            break;
         case 'info':
            console.log('[loader.js] => ( '+content+' )')
            break;
         default:
            console.log('[loader.js] => > '+content+' <')
            break;
      }
   }

   // Define file repository
   const repository = 'https://raw.githubusercontent.com/starzonenya/stug/master/dev'

   // Inject HTML
   try {
      var html = await fetchfile(repository+'/ui/container.html');
      document.body.appendChild(container('div', html));
   } catch(err) { message('error', err);
      message('warning', 'please report this error so it can be fixed.');
   }
   message('info', 'injected container.html');

   // Inject CSS
   try {
      var css = await fetchfile(repository+'/ui/style.css');
      document.head.appendChild(container('style', css));
   } catch(err) { message('error', err);
      message('warning', 'please report this error so it can be fixed.');
   }
   message('info', 'injected style.css');

   // Inject JS
   try {
      var render = await fetchfile(repository+'/ui/render.js');
      document.head.appendChild(container('script', render));
   } catch(err) { message('error', err);
      message('warning', 'please report this error so it can be fixed.');
   }
   message('info', 'injected render.js');
   try {
   var exploit = await fetchfile(repository+'/exploit.js');
   document.head.appendChild(container('script', exploit));
   } catch(err) { message('error', err);
      message('warning', 'please report this error so it can be fixed.');
   }
   message('info', 'injected exploit.js');
})();