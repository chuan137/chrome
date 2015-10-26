//debugger;

$(document).ready(function() {
    console.log("content script injecting");
    console.log(document.URL);
    var $x = $("appbar");
    $x.bind("DomNodeInserted", reloadHandler);
    console.log($x);
});

//
// Mutation observer 
//
var gsURI;
var observer = new MutationObserver(function(mutations) {
  mutations.some(function(mutation) {
    if (mutation.type == 'childList' && mutation.addedNodes.length > 0) {
      return (gsURI = mutation.addedNodes[0].baseURI);
    }
  });    
  console.log(gup(gsURI, 'q'));
});

// configuration of the observer:
var config = { attributes: true, childList: true, subtree: true };
var targetNode = document.body;
observer.observe(targetNode, config);

function reloadHandler() {
    console.log("results loaded");
}

//
// handle background message
//
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  console.log(sender, msg.text);
});

function gup(uri, name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "g"); 
  var results = null;
  do {
    results = regex.exec(uri);
    if (results) console.log(results[1]);
  } while (results);
}
  //return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
