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
let modmenuHTML, modmenuCSS;
modmenuCSS = `<link rel="stylesheet" href="https://raw.githubusercontent.com/starz0ne/stug/master/ui-dev/style.css">`;
fetch('https://raw.githubusercontent.com/starz0ne/stug/master/ui-dev/page.html')
   .then(response => response.text())
   .then(html => {
      modmenuHTML = html;
   })
   .catch(error => {
      console.error('Error fetching HTML:', error);
   });

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
function ggcrv(e) { return getComputedStyle(document.documentElement).getPropertyValue(e).trim(); }

// drag variables
let offsetX, offsetY, isDragging = false;

// other variables
var oldmaincolor;

// drag functions
function handleMouseDown(event) {
   isDragging = true;
   const boundingRect = modmenu.getBoundingClientRect();
   offsetX = event.clientX - boundingRect.left;
   offsetY = event.clientY - boundingRect.top;
}
function handleMouseMove(event) {
   if (!isDragging) return;
   const newX = event.clientX - offsetX;
   const newY = event.clientY - offsetY;
   modmenu.style.left = `${newX}px`;
   modmenu.style.top = `${newY}px`;
}
function handleMouseUp() { isDragging = false; }

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
   // change dimensions
   cdrce('--modmenu-header-height', '5px');
   cdrce('--modmenu-height', '28px');
   cdrce('--modmenu-width', '33px');

   // change colors
   mainbordercolor = ggcrv('--main-border-color');
   headerbordercolor = ggcrv('--header-border-color');
   headercolor = ggcrv('--header-color');
   cdrce('--main-border-color', 'var(--minimized-color)');
   cdrce('--header-border-color', 'var(--minimized-color)');
   cdrce('--header-color', 'var(--minimized-color)');

   // change visibility and positions
   cdrce('--maximize-button-left', '165px');
   cdrce('--visibility', 'hidden');

   // hide the minimize element & show the maximize element
   maximize.className = 'maximize';
   minimize.className = 'minimize hidden';
}
function maximizeModMenu() {
   // hide the maximize element & show the minimize element
   maximize.className = 'maximize hidden';
   minimize.className = 'minimize';

   // change visibility and positions
   cdrce('--visibility', 'visible');
   cdrce('--maximize-button-left', '0px');

   // change colors
   cdrce('--main-border-color', mainbordercolor);
   cdrce('--header-border-color', headerbordercolor);
   cdrce('--header-color', headercolor);

   // change dimensions
   cdrce('--modmenu-width', '340px');
   cdrce('--modmenu-height', '300px');
   cdrce('--modmenu-header-height', '8px');
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
anonymitymode.onclick = function() { handleToggle(this); anonymityMode(); };

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