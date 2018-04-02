function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        console.log(request.source);
    }
});

function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: 'jquery-3.2.0.min.js'
    }, function(){
        chrome.tabs.executeScript(null, {
            file: "getSource.js"
        }, function() {
            if (chrome.extension.lastError) {
                document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        });
    });
    APP.init();
}

window.onload = onWindowLoad;


var APP = (function(){
    var init = function(){
        console.log('init');
    };

    return {
        init:init,
    }
})();