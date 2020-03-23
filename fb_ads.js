// ==UserScript==
// @name         Fb ads - higlight
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       gapzroble
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

})();

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

window.scrolled = false;

window.highlightAds = function() {
    var ads = document.evaluate('//div[@id="contentArea"]//a[text()="Sponsored"]/ancestor::div[@role="article"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var count = 0;
    for (var i=0; i<ads.snapshotLength; i++) {
		var next = ads.snapshotItem(i);
        next.style.border = "10px solid red";

        var buttons = next.querySelectorAll('a[ajaxify]');
        var hasUndo = false;
        for (var y=0; y<buttons.length; y++) {
            var undo = buttons[y];
            if(buttons[y].innerText == 'Undo') {
                hasUndo = true;
                break;
            }
        }

        if (hasUndo) {
            next.style.border = "0px";
            if (scrolled === next) {
                scrolled = false;
            }
        } else {
            count++;
            if (scrolled === false || scrolled == next) {
                var pos = findPos(next);
                if (pos !== undefined) {
                    window.scroll(0,findPos(next)-200);
                    scrolled = next;
                }
            }
        }
	}
    console.log("found", count, "ads");
}

setInterval(function() {
    highlightAds();
}, 2000);
