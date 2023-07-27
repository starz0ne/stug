// ==UserScript==
// @name         Dusty (Stug.io ModMenu)
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Just your regular stug.io mod menu
// @author       cosmicdust
// @match        https://stug.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stug.io
// @grant        none
// ==/UserScript==

(function() {
'use strict';

   // modmenu html/css
   let modmenuHTML = `
   <link href="https://github.com/starz0ne/stug/blob/5870375f370f4dc09bf77b59c2738ad78e28eb03/ui-dev/style.css" rel="stylesheet"/>
   <div class="modmenu">
      <div class="modmenu-header">
         <div class="maximize hidden" id="maxi"></div>
         <div class="header-text">DUSTY</div>
         <div class="stage">(SOLAR)</div>
         <div class="minimize" id="mini"></div>
      </div>
      <div class="modmenu-content">
         <section>
            <label for="am-m" class="textbox">ANONYMITY</label>
            <input class="toggle inactive" id="am-m" type="button" value="INACTIVE">
         </section>
      </div>
   </div>
   `

   // insert modmenu into page
   const sE = document.createElement('style');
   const dE = document.createElement('div');
   dE.innerHTML = modmenuHTML;
   sE.innerHTML = modmenuCSS;
   document.head.appendChild(sE);
   document.body.appendChild(dE);

   // shortcut functions
   function idget(e) { return document.getElementById(e); }
   function qrget(e) { return document.querySelector(e); }
   function cdrce(e, v) { document.documentElement.style.setProperty(e, v); }

   // drag variables
   let offsetX, offsetY, isDragging = false;

   // drag functions
   function handleMouseDown(event) {
      isDragging = true;
      const boundingRect = modmenu.getBoundingClientRect();
      offsetX = event.clientX - boundingRect.left;
      offsetY = event.clientY - boundingRect.top;
   } function handleMouseMove(event) {
      if (!isDragging) return;
      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;
      modmenu.style.left = `${newX}px`;
      modmenu.style.top = `${newY}px`;
   } function handleMouseUp() { isDragging = false; }

   // inactive/active toggle handler
   function handleToggle(element) {
      let ev = element.value;
      let isActive = (ev === "INACTIVE") ? false : true;
      if (!isActive) {
         element.className = 'toggle active';
         element.value = "ACTIVE";
      } else {
         element.className = 'toggle inactive';
         element.value = "INACTIVE";
      }
   };

   // minimize/maximize window functions
   function minimizeModMenu() {
      cdrce('--modmenu-header-height', '5px');
      cdrce('--maximize-button-left', '165px');
      cdrce('--modmenu-height', '33px');
      cdrce('--modmenu-width', '32px');
      cdrce('--visibility', 'hidden');
      maximize.className = 'maximize';
      minimize.className = 'minimize hidden';
   } function maximizeModMenu() {
      maximize.className = 'maximize hidden';
      minimize.className = 'minimize';
      cdrce('--modmenu-header-height', '8px');
      cdrce('--maximize-button-left', '0px');
      cdrce('--modmenu-height', '300px');
      cdrce('--modmenu-width', '340px');
      cdrce('--visibility', 'visible');
   }

   // exploit functions
   function anonymityMode() {

   }

   // get modmenu elements
   var modmenuheader = qrget('.modmenu-header');
   var modmenu = qrget('.modmenu');
   var minimize = idget('mini');
   var maximize = idget('maxi');

   // add drag function listeners
   modmenuheader.addEventListener('mousedown', handleMouseDown);
   document.addEventListener('mousemove', handleMouseMove);
   document.addEventListener('mouseup', handleMouseUp);

   // process interactions with minimize/maximize buttons
   minimize.onclick = function () { minimizeModMenu(); }
   maximize.onclick = function () { maximizeModMenu(); }

   // get modmenu feature elements, and process interactions for them
   var anonymitymode = idget('am-m');
   anonymitymode.onclick = function() { handleToggle(this); anonymityMode(); }


   // TODO:
   // Download the CSS and HTML from a hosted file instead of copypasting it
   // Attack Prediction Lines (Enemy, You)
   // Grenade Prediction Lines (You)
   // Attack Nullifier Toggle
   // Attack Damage Modifier Changer
   // Info Spoofer
   // Invincibility
   // Infinite Boost
   // No Reload Time
   // Ban Evade
   // Kick Evade
   // Mute Evade
})();