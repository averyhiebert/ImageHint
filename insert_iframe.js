function deleteIFrame(){
    document.getElementById("inserted-imagehint-iframe").remove();
}

function doSearch(query,callback){
    // Callback will be called on resulting image search results document.
    var url = "https://www.bing.com/images/search?q="+encodeURIComponent(query)
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        callback(this.responseXML);
    }
    xhttp.open("GET",url,true);
    xhttp.responseType = "document";
    xhttp.send();
}

function extractImages(doc){
    // Extract top 3 image urls from document.
    var results = []
    for (ind of ["1","2","3"]){
        var selector = `li[data-idx="${ind}"] img`
        results.push(doc.querySelector(selector).src)
    }
    return results
}

function processSearch(doc){
    results = extractImages(doc)
    url_args = "/?q=0"
    for (i of [0,1,2]){
        url_args += `&r${i+1}=${encodeURIComponent(results[i])}`
    }
    insertIFrame(url_args);
}

function insertIFrame(url_args){
    var url = browser.runtime.getURL("ui/image_list.html");
    // Add iFrame to page (will eventually contain the image results)
    var elem = document.createElement("iframe");
    elem.setAttribute("style", "position:fixed; top:10px; right:10px; background-color:white; border: thin solid black; width: 35%; height: 200px; z-index:1000;")
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

