function main(){
    // Create the context menu button
    browser.contextMenus.create({
      id: "image-hint",
      title: "View image hint.",
      contexts: ["selection"],
    });

    // Add functionality to context menu button
    browser.contextMenus.onClicked.addListener((info,tab) => {
        if (info.menuItemId == "image-hint"){
            browser.tabs.executeScript(tab.id,
                {file: "./insert_iframe.js"},
                function(){
                    browser.tabs.executeScript(tab.id,
                        {code:`doSearch("${info.selectionText}",displayResults);`})
                }
            );
        }
    });
}

main();
