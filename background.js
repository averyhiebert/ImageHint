
function insertableCode(message){
    /* Construct a string representing some code to execute in the tab, which
    should add a popup in the top-right with image search results and
    an x button. */

    url = browser.runtime.getURL("ui/image_list.html");
    
    // TODO: Replace this nonsense with messages.
    code = "var inserted_message = '" + message + "';"
    code += "var inserted_url = '" + url + "';"
    function runInTab(msg){
        // Add iFrame to page (will eventually contain the image results)
        elem = document.createElement("iframe");
        elem.setAttribute("style", "position:fixed; top:10px; right:10px; background-color:white; border: thin solid black; width: 20%; height: 100px;")
        elem.setAttribute("src",inserted_url);

        body = document.getElementsByTagName("body")[0]
        body.appendChild(elem);
    }
    code += runInTab.toString() + ";";
    code += "runInTab(inserted_message);";
    return code;
}

function main(){
    // Create the context menu button
    browser.contextMenus.create({
      id: "image-hint",
      title: "Get Image Hint",
      contexts: ["selection"],
    });

    // Add functionality to context menu button
    browser.contextMenus.onClicked.addListener((info,tab) => {
        if (info.menuItemId == "image-hint"){
            // TODO: Perform search
            payload = insertableCode("this is a test");
            browser.tabs.executeScript(tab.id,{code: payload});
            //browser.browserAction.openPopup(); // Not working anymore?
        }
    });
}

main();
