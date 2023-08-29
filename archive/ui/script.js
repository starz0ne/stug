// define shortcut functions
const idget = (e) => document.getElementById(e);
const qrget = (e) => document.querySelector(e);
const cdrce = (e, v) => document.documentElement.style.setProperty(e, v);
const ggcrv = (e) => getComputedStyle(document.documentElement).getPropertyValue(e).trim();

// initialize some variables
let offsetX, offsetY, isDragging = false;
let mainbordercolor, headerbordercolor, headercolor;
let headerheight, modmenuheight, modmenuwidth;

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
   headerheight = ggcrv('--modmenu-header-height');
   modmenuheight = ggcrv('--modmenu-height');
   modmenuwidth = ggcrv('--modmenu-width');
   cdrce('--modmenu-header-height', '5px');
   cdrce('--modmenu-height', '30px');
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
   cdrce('--modmenu-width', modmenuwidth);
   cdrce('--modmenu-height', modmenuheight);
   cdrce('--modmenu-header-height', headerheight);
};

// variables for the modmenu elements
const modmenuheader = qrget('.modmenu-header');
const modmenu = qrget('.modmenu');
const minimize = idget('mini');
const maximize = idget('maxi');

// variables for modmenu feature elements
const shotgunmode = idget('sg-m');

// event listener for dragging
modmenuheader.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// process interactions with minimize/maximize buttons
minimize.onclick = () => minimizeModMenu();
maximize.onclick = () => maximizeModMenu();

// process interactions for modmenu features
shotgun.onclick = function() {
   handleToggle(this);
   shotgunMode();
};