// Copyright 2022 Jiri Skoda <developer@skodaj.cz>
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
