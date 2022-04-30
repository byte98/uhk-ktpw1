

(
    function($)
    {
        /**
         * Adds animation to object
         * @param {"fade-in" | "fade-out" | "stretch-in" | "stretch-out" | "menu-tablet-show" | "menu-tablet-hide" | "slide-left-hide" | "slide-left-show" | "slide-right-hide" | "slide-right-show" | "expand-rotate" | "collapse-rotate" | "slide-down"}
         *        animation Name of animation which will be added
         * @param {function} callback Function, which will be called when animation ends
         * @returns jQuery collection of objects with animation
         */
        $.fn.skodajcz_animate = function(animation, callback = null)
        {
            return this.each(function(){
                // First remove existing animations
                let classes = $(this).attr('class');
                if (classes != undefined)
                {
                    let classList = classes.split(/\s+/);
                    for (let i = 0; i < classList.length; i++)
                    {
                        if (classList[i].startsWith("skodajcz-animation-"))
                        {
                            $(this).removeClass(classList[i]);
                        }
                    }
                }                
                switch(animation)
                {
                    case "fade-in":          $(this).css("display", "block").addClass("skodajcz-animation-fade-in").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if (callback !== null) callback();});                                                                                                                                                     break;
                    case "fade-out":         $(this).addClass("skodajcz-animation-fade-out").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if ($(this).hasClass("skodajcz-animation-fade-out")) $(this).css("display", "none"); if (callback !== null) callback();});       break;
                    case "stretch-in":       $(this).css("display", "block").addClass("skodajcz-animation-stretch-in").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if (callback !== null) callback();});                                                                                                                                                  break;
                    case "stretch-out":      $(this).addClass("skodajcz-animation-stretch-out").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if ($(this).hasClass("skodajcz-animation-stretch-out"))$(this).css("display", "none"); if (callback !== null) callback();});  break;
                    case "menu-tablet-show": $(this).addClass("skodajcz-animation-menu-show-tablet").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if (callback !== null) callback();}).find("img.icon").css("margin-left", "0"); $("img#language-flag").css("display", "inline-block"); $(this).find("span").css("display", "inline");$(this).find("span.selected-flag").css("display", "inline-block"); break;
                    case "menu-tablet-hide": $(this).addClass("skodajcz-animation-menu-hide-tablet").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if (callback !== null) callback();});$(this).find("img.icon").css("margin-left", "10px");$("img#language-flag").css("display", "none"); $(this).find("span").css("display", "none");$(this).find("span.selected-flag").css("display", "inline-block");  break;
                    case "slide-left-hide":  $(this).addClass("skodajcz-animation-slide-left-hide").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){$(this).css("display", "none"); if (callback !== null) callback();}); break;
                    case "slide-left-show":  $(this).css("display", "block").addClass("skodajcz-animation-slide-left-show").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if (callback !== null) callback();}); break;
                    case "slide-right-hide": $(this).addClass("skodajcz-animation-slide-right-hide").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){$(this).css("display", "none"); if (callback !== null) callback();}); break;
                    case "slide-right-show": $(this).css("display", "block").addClass("skodajcz-animation-slide-right-show").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){if (callback !== null) callback();}); break;
                }
            });
        }
    }(jQuery)
);