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

(async function() { 'use strict';

// +++++++++++++++++++ MODMENU INJECTION
// prepare elements
var cL = document.createElement('link');
var dE = document.createElement('div');

// get html file
let response = await fetch(
   'https://raw.githubusercontent.com/starz0ne/stug/master/ui-dev/inject.html'
); let temp = await response.text();
dE.innerHTML = temp;

// set css link
cL.href = "https://raw.githubusercontent.com/starz0ne/stug/master/ui-dev/style.css";
cL.rel = "stylesheet";

// inject elements
document.head.appendChild(cL);
document.body.appendChild(dE);
// ++++++++++++++++++++++++++++++++++++

// define shortcut functions
const idget = (e) => document.getElementById(e);
const qrget = (e) => document.querySelector(e);
const cdrce = (e, v) => document.documentElement.style.setProperty(e, v);
const ggcrv = (e) => getComputedStyle(document.documentElement).getPropertyValue(e).trim();

// initialize some variables
let offsetX, offsetY, isDragging = false;
let mainbordercolor, headerbordercolor, headercolor;

// functions for handling dragging
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


// function for handling inactive/active toggle button
const handleToggle = (element) => {
  const ev = element.value;
  const isActive = (ev === "INACTIVE") ? false : true;
  if (!isActive) {
    element.className = 'toggle active';
    element.value = "ACTIVE";
  } else {
    element.className = 'toggle inactive';
    element.value = "INACTIVE";
  }
};

// functions for handling the minimize/maximize button
const minimizeModMenu = () => {
  /// change dimensions
  cdrce('--modmenu-header-height', '5px');
  cdrce('--modmenu-height', '28px');
  cdrce('--modmenu-width', '33px');

  /// change colors
  mainbordercolor = ggcrv('--main-border-color');
  headerbordercolor = ggcrv('--header-border-color');
  headercolor = ggcrv('--header-color');
  cdrce('--main-border-color', 'var(--minimized-color)');
  cdrce('--header-border-color', 'var(--minimized-color)');
  cdrce('--header-color', 'var(--minimized-color)');

  /// change visibility and positions
  cdrce('--maximize-button-left', '165px');
  cdrce('--visibility', 'hidden');

  /// hide the minimize element & show the maximize element
  maximize.className = 'maximize';
  minimize.className = 'minimize hidden';
};

const maximizeModMenu = () => {
  /// hide the maximize element & show the minimize element
  maximize.className = 'maximize hidden';
  minimize.className = 'minimize';

  /// change visibility and positions
  cdrce('--visibility', 'visible');
  cdrce('--maximize-button-left', '0px');

  /// change colors
  cdrce('--main-border-color', mainbordercolor);
  cdrce('--header-border-color', headerbordercolor);
  cdrce('--header-color', headercolor);

  /// change dimensions
  cdrce('--modmenu-width', '340px');
  cdrce('--modmenu-height', '300px');
  cdrce('--modmenu-header-height', '8px');
};

// exploit functions
const anonymityMode = () => {

};

// variables for the modmenu elements
const modmenuheader = qrget('.modmenu-header');
const modmenu = qrget('.modmenu');
const minimize = idget('mini');
const maximize = idget('maxi');

// variables for modmenu feature elements
const anonymitymode = idget('am-m');

// event listener for dragging
modmenuheader.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// process interactions with minimize/maximize buttons
minimize.onclick = () => minimizeModMenu();
maximize.onclick = () => maximizeModMenu();

// process interactions for modmenu features
anonymitymode.onclick = function() {
  handleToggle(this);
  anonymityMode();
};

})();