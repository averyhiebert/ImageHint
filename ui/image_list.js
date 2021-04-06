function main(){
    // Delete self if clicked
    var button = document.getElementById("delete-button")
    document.getElementsByTagName("body")[0].onclick = function deleteSelf(){
        parent.window.postMessage("delete-the-iframe","*");
    }

    // Get image links from url search parameters
    //  and show as images.
    var url = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    var im_list = document.getElementById("main-image-list");
    for (key of ["r1","r2","r3","r4","r5"]){
        var src = url.get(key)
        var im = document.createElement("img");
        im.src = src
        im.setAttribute("style","width: 100%");
        im_list.appendChild(im);
        im_list.append(document.createElement("br"));
        im_list.append(document.createElement("br"));
    }

    // Display the query text itself
    document.getElementById("title").innerHTML = url.get("q");
}

var docu = document.getElementsByTagName("body")[0]
docu.onload = main; // Necessary to ensure button is loaded when main is called
