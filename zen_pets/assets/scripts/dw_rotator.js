/*  dw_rotator.js  JavaScript rotate images code  version date: April 2005  */

/*************************************************************************
    This code is from Dynamic Web Coding at dyn-web.com
    Copyright 2001-5 by Sharon Paine 
    See Terms of Use at www.dyn-web.com/bus/terms.html
    regarding conditions under which you may use this code.
    This notice must be retained in the code as is!
*************************************************************************/

dw_Rotator.restartDelay = 500; // delay onmouseout before call to rotate
dw_Rotator.col = []; 

// arguments: image name, rotation speed, path to images (optional), 
// target, i.e. name of window to direct url's to onclick (optional)
function dw_Rotator(name, speed, path, tgt) {
    this.name = name; this.speed = speed || 4500; // default speed of rotation
    this.path = path || ""; this.tgt = tgt;
    this.ctr = 0; this.timer = 0; this.imgs = []; this.actions = [];
    this.index = dw_Rotator.col.length; dw_Rotator.col[this.index] = this;
    this.animString = "dw_Rotator.col[" + this.index + "]";
}

dw_Rotator.prototype.addImages = function() { // preloads images
    var img;
    for (var i=0; arguments[i]; i++) {
        img = new Image();
        img.src = this.path + arguments[i];
        this.imgs[this.imgs.length] = img;
    }
}

dw_Rotator.prototype.addActions = function() {
    var len = arguments.length; // in case an argument's value is null
    for (var i=0; i < len; i++) 
        this.actions[this.actions.length] = arguments[i]; 
}

dw_Rotator.prototype.rotate = function() {
    clearTimeout(this.timer); this.timer = null;
    if (this.ctr < this.imgs.length-1) this.ctr++;
    else this.ctr = 0;
    var imgObj = document.images[this.name];    
    if (imgObj) {
        imgObj.src = this.imgs[this.ctr].src;
        this.timer = setTimeout( this.animString + ".rotate()", this.speed);
    }
}

// Start rotation for all instances 
dw_Rotator.start = function() {
    var len = dw_Rotator.col.length, obj;
    for (var i=0; i<len; i++) {
        obj = dw_Rotator.col[i];
        if (obj && obj.name ) // check for empty instance created by dw_random.js
            obj.timer = setTimeout( obj.animString + ".rotate()", obj.speed);
    }
}

// called onclick of images
dw_Rotator.doClick = function(n) {
    var obj = dw_Rotator.col[n]; 
	if ( !document.images || !obj ) return true;
    if ( obj.actions && obj.actions[obj.ctr] ) {
        if ( typeof obj.actions[obj.ctr] == "string" ) { // url
            if ( obj.tgt ) { // open in separate window
                // add features here if you want, i.e., chrome, size, position, ...
                var win = window.open(obj.actions[obj.ctr], obj.tgt);
                if ( win && !win.closed ) win.focus();
            } else {
                window.location = obj.actions[obj.ctr];
            }
        } else { // function pointer 
            obj.actions[obj.ctr](); // execute function
        }
    }
    return false;
}

// for stopping/starting onmouseover/out
dw_Rotator.pause = function(n) {	
    dw_Rotator.clearTimers(n);
}

dw_Rotator.clearTimers = function(n) {
    var obj = dw_Rotator.col[n]; 
    if ( obj ) {
        clearTimeout( obj.timer ); obj.timer = null;
    }
}

dw_Rotator.resume = function(n) {
    dw_Rotator.clearTimers(n);
    var obj = dw_Rotator.col[n]; 
    if ( obj ) {
        obj.timer = setTimeout( obj.animString + ".rotate()", dw_Rotator.restartDelay );
    }
}
