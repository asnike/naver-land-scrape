function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        console.log(request.source);
        APP.setData(request.source);
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
    },
    setData = function(data){
        var i, j;

        for(i = 0, j = data.roomTypes.length ; i < j ; i++){
            $('<tr>'+
                '<td>'+data.location.si+'</td>'+
                '<td>'+data.location.gun+'</td>'+
                '<td>'+data.location.gu+'</td>'+
                '<td>'+data.location.apt+'</td>'+
                '<td>'+data.aptInfo.moveInDate+'</td>'+
                '<td>'+data.aptInfo.totalNumOfDong+'</td>'+
                '<td>'+data.aptInfo.totalNumOfFloor+'</td>'+
                '<td>'+data.roomTypes[i].numOfHouseholds+'</td>'+
                '<td>'+data.roomTypes[i].type+'</td>'+
                '<td>'+data.roomTypes[i].supplySize+'</td>'+
                '<td>'+data.roomTypes[i].privateSize+'</td>'+

                '<td>'+data.roomTypes[i].roomCount+'</td>'+
                '<td>'+data.roomTypes[i].bathCount+'</td>'+
                '<td>'+data.roomTypes[i].entrance+'</td>'+
                '<td>'+data.aptInfo.heating+'</td>'+
                '</tr>').appendTo('#rows');
        }
    };

    return {
        init:init,
        setData:setData,
    }
})();