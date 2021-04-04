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
            var text = info.selectionText;
            browser.tabs.executeScript(tab.id,
                {file: "./insert_iframe.js"},
                function(){
                    browser.tabs.executeScript(tab.id,
                        {code:"insertIFrame('" + text + "');"})
                        // TODO: Defense against weird XSS, I guess?
                        //  (i.e. strip out ' characters)
                }
            );
        }
    });
}

main();
