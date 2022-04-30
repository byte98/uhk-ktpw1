

/** FILE CONTAINING SCRIPTS OF HOME PAGE */

/**
 * Interval of carousel with actual events (in miliseconds)
 */
const CAROUSEL_INTERVAL = 5000;

/**
 * Actual carousel position
 */
let carousel_actual = 0;

$(document).ready(function(){

    // Carousel of events
    window.setInterval(function(){
        let count = $("article#program > ul > li").length;
        let step = $("article#program > ul > li").outerWidth();
        carousel_actual = (carousel_actual + 1) % count;
        $("article#program > ul").scrollLeft((carousel_actual * step) + 32);
    }, CAROUSEL_INTERVAL);
});
