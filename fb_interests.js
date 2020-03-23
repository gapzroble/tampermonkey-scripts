// ==UserScript==
// @name         Fb Not interested
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       https://addshore.com/2018/10/quickly-clearing-out-your-facebook-advert-interests/
// @match        https://www.facebook.com/ads/preferences/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

})();


// This is free and unencumbered software released into the public domain.
// For more information, please refer to <http://unlicense.org/>

// Find and return the position of the element given
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

// Click on the "See more" link
// Updated from https://addshore.com/2018/10/quickly-clearing-out-your-facebook-advert-interests/#comment-386
function clickSeeMore() {
    found = true
    while(found == true) {
        var seeMore = document.evaluate('//div[text()=\'See More\']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(seeMore) {
            window.scroll(0,findPos(seeMore)-200);
            seeMore.click();
        } else {
            found = false;
        }
    }
}

// Click on all X / Remove buttons currently on the page
function clickAllX(){
	var allX = document.evaluate('//button[@data-tooltip-content=\'Remove\']', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (i=0; i<allX.snapshotLength; i++) {
		var next  = allX.snapshotItem(i);
		window.scroll(0,findPos(next)-200);
		next.click();
	}
}

// Combination, Click "See more" and then click all "Remove" buttons
window.seeMoreAndClickXs = function() {
	clickSeeMore()
	clickAllX()
}

setTimeout(function() {
    console.log('begin');
    seeMoreAndClickXs();
}, 1000);

