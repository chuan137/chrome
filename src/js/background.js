'use strict';

// reload extension on reload page
var parser = document.createElement('a');
chrome.tabs.onUpdated.addListener(function(tabs, info, tab) {
  parser.href = tab.url;
  if (parser.host === 'www.google.de') {
    chrome.tabs.sendMessage(tab.id, { text: "reload extension"});
    chrome.runtime.reload();
  }
});
