//debugger;
console.log('Injected ...');

//
// Mutation observer 
//
NodeList.prototype.forEach = Array.prototype.forEach;
var observer= new MutationObserver(getSS);

observer.observe(document.body, {
  childList: true,
  subtree: true
});
    
function getSS (mutations) {
  var ss;
  mutations.some(function(mutation) {
    mutation
      .target
      .querySelectorAll('form.cdr_frm input')
      .forEach(function(el) {
        if (el.name === 'q') {
          ss = el.value;
          return true;  // break loop in some()
        }
      });
  });    
  console.log(ss);
};

//
// handle background message
//
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  console.log(sender, msg.text);
});
