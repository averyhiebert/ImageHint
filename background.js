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
            var selection_text = info.selectionText;
            // TODO: Strip out ' characters to avoid XSS-ish problems
            browser.tabs.executeScript(tab.id,
                {file: "./insert_iframe.js"},
                function(){
                    browser.tabs.executeScript(tab.id,
                        {code:`doSearch("${selection_text}",processSearch);`})
                }
            );
        }
    });
}

main();
