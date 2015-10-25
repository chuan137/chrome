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
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
    if (mutation.type == "childList") {
      console.log(mutation);
    }
  });    
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
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
