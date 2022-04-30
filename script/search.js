

// File handling search for actions

$("article#search-form form").on("submit", function(e){
    e.preventDefault();
    e.stopPropagation();

    $("#search-results table").remove();
    let results = [];
    $("tr").each(function(){
       let data = getData($(this).get(0));
       if (data["name"].trim() != "" && matches(getData($(this).get(0))))
       {
            results.push(data);  
       } 
    });
    let table = prepareTable(results);
    $("#search-results").append(table);
});

$("article#search-form form").on("reset", function(){
    $("#search-results table").remove();
    let results = [];
    let table = prepareTable(results);
    $("#search-results").append(table);
    $(".item").remove();
    $(".selectize-input").removeClass("has-items");
    $("#search-tags").val("");
});

/**
 * Checks, whether data matches selected filters
 * @param {any} data Data which will be checked, whether matches selected filters
 * @return {boolean} TRUE, if data matches selected filters, FALSE otherwises
 */
function matches(data)
{
    let reti = null;
    if ($("#search-name").val().trim() != "") // Check name
    {
        if (data["name"].trim().toLowerCase().includes($("#search-name").val().trim().toLowerCase()) == false)
        {
            reti = false;
        }
    }
    if (reti !== false && $("#search-date-from") != "") // Check 'from' date
    {
        let from = new Date($("#search-date-from").val());
        if (from > data["datetime"]["timestamp"])
        {
            reti = false;
        }
    }
    if (reti !== false && $("#search-date-to").val() != "") // Check 'to' date
    {
        let to = new Date($("#search-date-to").val());
        if (to < data["datetime"]["timestamp"])
        {
            reti = false;
        }
    }
    if (reti !== false && $("#search-tags").val() != "") // Check tags
    {
        let tags = $("#search-tags").val().split(",");
        tags.forEach(tag => {
            let found = false;
            data["tags"].forEach(t => {
                if (tag.trim().toLowerCase() == t.trim().toLowerCase())
                {
                    found = true;
                    return;
                }
            });
            if (found == false)
            {
                reti = false;
                return;
            }
        });
    }
    if (reti !== false)
    {
        reti = true;
    }
    return reti;
}

/**
 * Function which can get data from table row
 * @param {HTMLTableRowElement} tr Row of table which contains data
 * @returns {any} Object containing all available data parsed form table row
 */
function getData(tr)
{
    let reti = {};
    let datetime = {};
    datetime["timestamp"] = new Date($(tr).find("td[headers='events-date']").find("time").attr("datetime"));
    datetime["value"] = $(tr).find("td[headers='events-date']").find("time").attr("datetime");
    datetime["text"] = $(tr).find("td[headers='events-date']").find("time").text();
    reti["datetime"] = datetime;
    reti["name"] = $(tr).find("td[headers='events-name'] a").text();
    reti["link"] = $(tr).find("td[headers='events-name'] a").attr("href");
    reti["price"] = $(tr).find("td[headers='events-price']").text();
    let tags = [];
    $(tr).find("td[headers='events-tag'] li").each(function(){
        tags.push($(this).text());
    });
    reti["tags"] = tags;
    return reti;
}

/**
 * Prepares table do display search results
 * @param {array} results Data which will be displayed in table
 * @returns {HTMLTableElement} Table with results
 */
function prepareTable(results)
{
    let body = $("<tbody></tbody>");
    if (results.length < 1)
    {
        $(body).append($("<tr></tr>").append($("<td></td>").attr("colspan", 4).text("Není tu nic k zobrazení...")));
    }
    else
    {
        for (let i = 0; i < results.length; i++)
        {
            let tags = $("<ul></ul>");
            for(let t = 0; t < results[i]["tags"].length; t++)
            {
                $(tags).append($("<li></li>").text(results[i]["tags"][t]));
            }
            let date = $("<td></td>").attr("headers", "events-date").append(
                $("<time></time>").attr("datetime", results[i]["datetime"]["value"]).text(results[i]["datetime"]["text"])
            );
            $(body).append(
                $("<tr></tr>").append(
                        date
                    ).append(
                    $("<td></td>").attr("headers", "events-name").append(
                        $("<a></a>").attr("href", results[i]["link"]).text(results[i]["name"]))
                    ).append(
                    $("<td></td>").attr("headers", "events-price").text(results[i]["price"])
                    ).append(
                    $("<td></td>").attr("headers", 'events-tags').append(tags)
                    )
                );
        }
    }
    return $("<table></table>").attr("id", "search-results").append(
                $("thead").clone()
                ).append(
                body
                );
}