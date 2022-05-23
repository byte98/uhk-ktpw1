// Semestral project (Center Omega) (c) by Jiri Skoda <skodaji1@uhk.cz>
// 
// Semestral project (Center Omega) is licensed under a
// Creative Commons Attribution-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.



$(document).ready(function(){
    $("#search-tags").selectize({
        delimiter: ",",
        persist: false,
        create: function (input) {
          return {
            value: input,
            text: input,
          };
        },
      });
});