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

// File which only changes all dates to next month

const months =     ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
const monthNames = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "září", "říjen", "listopad", "prosinec"]; 
const days =       ["Každou neděli", "Každé pondělí", "Každé úterý", "Každou středu", "Každý čtvrtek", "Každý pátek", "Každou sobotu"];

$(document).ready(function(){
    $("time").not("footer time, .regular time").each(function(){
        let datetime = Date.parse($(this).attr("datetime"));
        if (isNaN(datetime))
        {
            datetime = 0;
        }
        let date = new Date(datetime);
        let now = new Date();
        let text = "";
        if ($(this).hasClass("actual") == false)
        {
            date.setMonth((now.getMonth() + 1) % 12);
            if (now.getMonth() == 11)
            {
                date.setFullYear(now.getFullYear() + 1);
            }
        }
        else
        {
            date.setMonth(now.getMonth());
            date.setFullYear(now.getFullYear());
        }
        if (isNaN(date.getDate()) == false &&
            date.getDate() != undefined &&
            isNaN(date.getMonth()) == false &&
            date.getMonth() != undefined &&
            isNaN(date.getFullYear()) == false &&
            date.getFullYear() != undefined &&
            date.getFullYear() > 1970
           )
        {
            text += date.getDate() + ". " + months[date.getMonth()] + " " + date.getFullYear();
            
        }
        if (date.getHours() > 2)
        {
            text += ", " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        }
        $(this).text(text);
        $(this).attr("datetime", date.toISOString());
    });
    $(".month-name").each(function(){
        let now = new Date();
        if ($(this).hasClass("actual") == false)
        {
            now.setMonth((now.getMonth() + 1) % 12);
            if (now.getMonth() == 11)
            {
                now.setFullYear(now.getFullYear() + 1);
            }
        }
        $(".month-name").text(monthNames[now.getMonth()] + " " + now.getFullYear());
    });
    $(".regular time").each(function(){
        let datetime = Date.parse($(this).attr("datetime"));
        if (isNaN(datetime))
        {
            datetime = 0;
        }
        let date = new Date(datetime);
        let now = new Date();
        let text = "";
        if ($(this).hasClass("actual") == false)
        {
            date.setMonth((now.getMonth() + 1) % 12);
            if (now.getMonth() == 11)
            {
                date.setFullYear(now.getFullYear() + 1);
            }
        }
        else
        {
            date.setMonth(now.getMonth());
            date.setFullYear(now.getFullYear());
        }
        text += days[date.getDay()] + ", " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        let time = $("<time></time>").attr("datetime", date.toISOString()).text(text);
        let parent = $(this).parent();
        $(parent).empty();
        $(parent).append($(time));
    });
});