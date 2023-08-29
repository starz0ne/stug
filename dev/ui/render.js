// shortcut functions //
const id = (e) => document.getElementById(e);
const qs = (e) => document.querySelector(e);
const cv = (e, v) => document.documentElement.style.setProperty(e, v);
const gv = (e) => getComputedStyle(document.documentElement).getPropertyValue(e).trim();

// element variables //
var menubody    = qs('.menu-body');
var menuheader  = qs('.menu-header');
var menucontent = qs('.menu-content');

// drag variables //
var offset = [0,0];
var down = false;
var mouse;

// drag functions //
menubody.addEventListener('mousedown', (e) => {
   down = true;
   offset = [
      menubody.offsetLeft - e.clientX,
      menubody.offsetTop - e.clientY
   ];
}, true);

document.addEventListener('mouseup', () => {
   down = false;
}, true);

document.addEventListener('mousemove', (event) => {
   event.preventDefault();
   if (down) {
       mousePosition = {
           x : event.clientX,
           y : event.clientY
       };
       menubody.style.left = (mousePosition.x + offset[0]) + 'px';
       menubody.style.top  = (mousePosition.y + offset[1]) + 'px';
   }
}, true);