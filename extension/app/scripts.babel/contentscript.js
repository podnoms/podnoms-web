'use strict';
console.log('Content script', chrome.runtime.id);

function onRequest(request, sender, sendResponse) {
    if (request.action === 'process-page') {
        const array = $.map(links, (n, i) => {
            return { href: n.href, text: n.text };
        });
        sendResponse(array);
    }
}
chrome.runtime.onMessage.addListener(onRequest);

const links = $(document).find('a[href$="mp3"]');
if (links && links.length !== 0) {
    chrome.runtime.sendMessage({ type: 'updatebadge', data: '' + links.length });
}
