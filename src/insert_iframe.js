function deleteIFrame(){
    document.getElementById("inserted-imagehint-iframe").remove();
}

function doSearch(query,callback){
    // Callback will be called on resulting image search results document.
    var url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}`
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        callback(query,this.responseXML);
    }
    xhttp.open("GET",url,true);
    xhttp.responseType = "document";
    xhttp.send();
}


function extractImages(doc){
    // Extract all image urls from document.
    var results = []
    doc.querySelectorAll("#results ul > li > a > noscript > img")
       .forEach(elem => results.push(elem.src));
    return results
}

function displayResults(query, doc){
    results = extractImages(doc)
    insertIFrame(query,results);
}

function insertIFrame(query,results){
    /* Create & insert an IFrame containing the resulting images, using
       a data URL per the recommended security practices from mozilla.org,
       not that there are any particular obvious security risks either way.*/

    // TODO: Remove current iframe if it exists, to prevent multiple elements
    //  with the same id from existing.
    //  Doesn't seem to be causing any problems currently, though.

    var parser = new DOMParser();
    var doc = parser.parseFromString("<html><head></head><body onclick=\"parent.window.postMessage('delete-the-iframe','*');\"></body></html>",
        "text/html");

    // Create title element
    var title = doc.createElement("h4");
    title.textContent = query;
    title.setAttribute("style","position:fixed;top:0px;left:0px;margin-top:0;padding-top:10px;padding-bottom:10px;background-color:#DDDDDD;width:100%;text-align:center");

    doc.body.appendChild(title)
    doc.body.appendChild(doc.createElement("br"));
    doc.body.appendChild(doc.createElement("br"));

    // Insert images
    var im_list = doc.createElement("div");
    im_list.setAttribute("style","text-align:center");
    for (var i = 0; i < 5; i++){
        var src = results[i];
        var im = doc.createElement("img");
        im.src = src
        im.setAttribute("style","width: 100%");
        im_list.appendChild(im);
        im_list.append(doc.createElement("br"));
        im_list.append(doc.createElement("br"));
    }
    doc.body.appendChild(im_list);

    // Convert to text/data url
    var documentText = (new XMLSerializer()).serializeToString(doc)
    var dataurl = "data:text/html," + encodeURIComponent(documentText);

    // Insert iframe into main page
    var elem = document.createElement("iframe");
    elem.setAttribute("style", "position:fixed; top:10px; right:10px; background-color:white; border: thin solid black; width: 35%; max-width:300px; height: 300px; z-index:10000000;border-radius:10px;")
    elem.setAttribute("src",dataurl);
    elem.setAttribute("id","inserted-imagehint-iframe")

    body = document.getElementsByTagName("body")[0]
    body.appendChild(elem);
}

window.addEventListener("message",function(event){
    if (event.data=="delete-the-iframe"){
        deleteIFrame();
    }
},false);

