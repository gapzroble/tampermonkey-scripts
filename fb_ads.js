// ==UserScript==
// @name         xFbxadsx
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       gapzroble
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

function debug(msg) {
    console.log(msg);
}

function checkSponsored() {
    if ('Sponsored' == jQuery(this).text()) {
        debug('hide ad');
        jQuery(this).parents('div[role=article]').remove();
    }
}

function findAds() {
    debug('find ads');
    jQuery('div[role=article] a[href="#"]').each(checkSponsored);
}

var timer;
function init() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(findAds, 200);
}

var jqcheck;
jqcheck = setInterval(function() {
    if (window.jQuery !== undefined) {
        clearInterval(jqcheck);
        init();
        jQuery(document).click(function() {
            debug('init');
            init();
        });
    }
}, 200);
