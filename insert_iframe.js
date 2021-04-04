function deleteIFrame(){
    document.getElementById("inserted-imagehint-iframe").remove();
}

function insertIFrame(url_args){
    var url = browser.runtime.getURL("ui/image_list.html");
    // Add iFrame to page (will eventually contain the image results)
    var elem = document.createElement("iframe");
    elem.setAttribute("style", "position:fixed; top:10px; right:10px; background-color:white; border: thin solid black; width: 20%; height: 100px;")
    elem.setAttribute("src",url+url_args);
    elem.setAttribute("id","inserted-imagehint-iframe")

    var body = document.getElementsByTagName("body")[0]
    body.appendChild(elem);
    //setTimeout(deleteIFrame,20000);
}

window.addEventListener("message",function(event){
    if (event.data=="delete-the-iframe"){
        deleteIFrame();
    }
},false);

