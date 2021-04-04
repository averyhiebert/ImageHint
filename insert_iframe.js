function deleteIFrame(){
    document.getElementById("inserted-imagehint-iframe").remove();
}

function doSearch(query,callback){
    // Callback will be called on resulting image search results document.
    //  TODO Proper escaping
    var url = "https://www.bing.com/images/search?q="+encodeURIComponent(query)
    console.log("Sending response...");
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        callback(this.responseXML);
    }
    xhttp.open("GET",url,true);
    xhttp.responseType = "document";
    xhttp.send();
}

function extractResults(doc){
    //console.log(doc.documentElement.innerHTML); // Convenient for debugging
    //console.log(doc);

    // Extract top 3 image urls from document.
    var results = []
    for (ind of ["1","2","3"]){
        //results.push(doc.querySelector("li[data-idx=\"" + ind + "\"] img.mimg").src)
        var selector = `li[data-idx="${ind}"] img`
        results.push(doc.querySelector(selector).src)
    }
    return results
}

function insertIFrame(query){
    //doSearch(query,x => console.log(x.title));
    doSearch(query,function(result){
        results = extractResults(result);
        console.log(results);
    });
    url_args = "/?q=query";

    var url = browser.runtime.getURL("ui/image_list.html");
    // Add iFrame to page (will eventually contain the image results)
    var elem = document.createElement("iframe");
    elem.setAttribute("style", "position:fixed; top:10px; right:10px; background-color:white; border: thin solid black; width: 20%; height: 100px;")
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

