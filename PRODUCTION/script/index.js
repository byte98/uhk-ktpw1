// Semestral project (Center Omega) (c) by Jiri Skoda <skodaji1@uhk.cz>
// 
// Semestral project (Center Omega) is licensed under a
// Creative Commons Attribution-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.



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
