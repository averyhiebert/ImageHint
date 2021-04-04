function main(){
    // Get arguments from url search parameters
    var url = new URLSearchParams(window.location.search);
    console.log(url.get("q"));

    // Set up delete button
    var button = document.getElementById("delete-button")
    button.onclick = function deleteSelf(){
        parent.window.postMessage("delete-the-iframe","*");
    }
}

var docu = document.getElementsByTagName("body")[0]
docu.onload = main; // Necessary to ensure button is loaded when main is called
