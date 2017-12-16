'use strict';
console.log('Background');
chrome.runtime.onMessage.addListener(function(event, sender, sendResponse) {
    if (event.type === 'updatebadge') {
        chrome.tabs.get(sender.tab.id, function(tab) {
            // chrome.pageAction.show(tab.id);
            if (chrome.runtime.lastError) {
                return;
            }
            if (tab.index >= 0) {
                chrome.browserAction.setBadgeBackgroundColor({ tabId: tab.id, color: [255, 0, 0, 255] });
                chrome.browserAction.setBadgeText({ tabId: tab.id, text: event.data });
            } else {
                var tabId = sender.tab.id,
                    text = event.data;
                chrome.webNavigation.onCommitted.addListener(function update(details) {
                    if (details.tabId == tabId) {
                        chrome.browserAction.setBadgeText({ tabId: tab.id, text: event.data });
                        chrome.webNavigation.onCommitted.removeListener(update);
                    }
                });
            }
        });
    }
});
