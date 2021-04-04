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
            var text = info.selectionText;
            browser.tabs.executeScript(tab.id,
                {file: "./insert_iframe.js"},
                function(){
                    browser.tabs.executeScript(tab.id,
                        {code:"insertIFrame('/?q=" + text + "');"})
                }
            );
        }
    });
}

main();
