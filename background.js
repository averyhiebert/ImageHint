browser.contextMenus.create({
  id: "image-hint",
  title: "Get Image Hint",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info,tab) => {
    if (info.menuItemId == "image-hint"){
        // TODO: Perform search and communicate this to the popup somehow
        browser.browserAction.openPopup();
    }
});
