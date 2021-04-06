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
    //console.log((new XMLSerializer()).serializeToString(doc))
    results = extractImages(doc)
    url_args = `/?q=${encodeURIComponent(query)}`
    for (i of [0,1,2,3,4]){
        url_args += `&r${i+1}=${encodeURIComponent(results[i])}`
    }
    insertIFrame(url_args);
}

function insertIFrame(url_args){
    // TODO: Use data url instead of web-accessible resource, since this
    //   avoids problems with the web page being able to fingerprint the
    //   user based on extension ID, and/or problems with the page being
    //   able to interact with the extension.
    var url = browser.runtime.getURL("ui/image_list.html");

    // TODO: Remove current iframe if it exists, to prevent multiple elements
    //  with the same id from existing.

    // Add iFrame to page (will contain image results)
    var elem = document.createElement("iframe");
    elem.setAttribute("style", "position:fixed; top:10px; right:10px; background-color:white; border: thin solid black; width: 35%; max-width:300px; height: 300px; z-index:1000;")
    elem.setAttribute("src",url+url_args);
    elem.setAttribute("id","inserted-imagehint-iframe")

    var body = document.getElementsByTagName("body")[0]
    body.appendChild(elem);
}

window.addEventListener("message",function(event){
    if (event.data=="delete-the-iframe"){
        deleteIFrame();
    }
},false);

