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
   <link href="https://fonts.googleapis.com/css?family=Orbitron:800" rel="stylesheet"/>
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
   let modmenuCSS = `
   /* global variables */
   :root {
     --toggle-btn-width: calc(var(--textbox-width) - 70px);
     --textbox-width: calc(var(--modmenu-width) - 166px);
     --maximize-button-left: 0px;
     --modmenu-header-height: 8px;
     --toggle-btn-height: 30px;
     --modmenu-height: 300px;
     --textbox-height: 20px;
     --modmenu-width: 340px;
     --visibility: visible;
   }

   /* main modmenu styling */
   .modmenu {
      position: absolute !important;
      height: var(--modmenu-height);
      width: var(--modmenu-width);
      background-color: #e2a336;
      border: 4px solid #594c28;
      font-family: Orbitron;
      border-radius: 10px;
      user-select: none;
      color: #231c0f;
      z-index: 150;
   }
   .modmenu-header {
      border-bottom: 4px solid #594c28;
      border-radius: 6px 6px 0 0;
      background-color: #9e7837;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      display: flex;
      cursor: move;
      padding: var(--modmenu-header-height);
   }
   .modmenu-content {
      visibility: var(--visibility);
      justify-content: center;
      flex-direction: column;
      align-items: center;
      display: flex;
      padding: 20px;
      overflow: auto;
   }

   /* modmenu header text styling & spacing */
   .header-text {
      visibility: var(--visibility);
      margin-left: auto;
      margin-right: 4px;
   }
   .stage {
      visibility: var(--visibility);
      color: #e8c902;
      margin-left: 4px;
      margin-right: auto;
   }
   section {
      justify-content: space-between;
      display: flex;
      margin-bottom: 8px;
   }

   /* minimize and maximize styling */
   .minimize {
      border-color: #594c28;
      text-align: left;
      color: #594c28;
      margin: auto;
      margin-right: 0px;
      margin-left: 0px;
   } .minimize:after {
      position: relative;
      border: 2px dashed;
      border-radius: 6px;
      padding-right: 2px;
      padding-left: 2px;
      content: '\d7';
   } .minimize:hover {
      background-color: rgba(73, 59, 31, 0.2);
   } .minimize.hidden {
      visibility: hidden;
   }

   .maximize {
      border-color: #594c28;
      text-align: left;
      color: #594c28;
      margin: auto;
      margin-right: 0px;
      margin-left: var(--maximize-button-left);
   } .maximize:after {
      position: relative;
      border: 2px dashed;
      border-radius: 6px;
      padding-right: 2px;
      padding-left: 2px;
      content: '\2197';
   } .maximize:hover {
      background-color: rgba(73, 59, 31, 0.2);
   } .maximize.hidden {
      visibility: hidden;
   }

   /* toggle button styling */
   .textbox {
      height: var(--textbox-height);
      width: var(--textbox-width);
      background-color: #cc9028;
      border: 5px solid #cc9028;
      text-align: center;
      position: relative;
      overflow: hidden;
      padding: 1px;
      margin: auto;
   } .toggle {
      height: var(--toggle-btn-height);
      width: var(--toggle-btn-width);
      font-family: Orbitron;
      text-align: center;
      position: relative;
      border-radius: 3px;
      overflow: hidden;
      font-size: 12px;
      margin: auto;
      margin-left: 10px;
   } .toggle.active {
      background-color: #51c128;
      border: 2px solid #51c128;
   } .toggle.inactive {
      background-color: #cc5c28;
      border: 2px solid #cc5c28;
   } .toggle.active:active {
      background-color: #4cb227;
      border: 2px solid #4cb227;
   } .toggle.inactive:active {
      background-color: #b75528;
      border: 2px solid #b75528;
   }
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