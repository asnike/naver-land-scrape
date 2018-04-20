function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
chrome.extension.onMessage.addListener(function(request, sender) {
    console.log('onMessage');
    if (request.action == "getSource") {
        console.log(request.source);
        APP.setData(request.source);
    }
});



function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: "getSource.js"
    }, function() {
        if (chrome.extension.lastError) {
            document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
        }
    });
    APP.init();
}

window.onload = onWindowLoad;


var APP = (function(){
    var init = function(){
        console.log('init');
    },
    setData = function(data){
        console.log(data);
        if(data.location && data.location.si && data.roomTypes.length > 0){
            $('#existView').css({'display':'block'});
            $('#emptyView').css({'display':'none'});
        }else return;
        $('#region').text(data.location.si + ' ' + data.location.gun + ' ' + data.location.gu);
        $('#aptName').text(data.location.apt);
        $('#btnGoogle').attr('href', 'https://www.google.co.kr/search?q=' + data.location.apt);
        $('#btnNaver').attr('href', 'https://search.naver.com/search.naver?query=' + data.location.apt);

        var i, j;

        for(i = 0, j = data.roomTypes.length ; i < j ; i++){
            $('<tr>'+
                '<td>'+data.location.si+'</td>'+
                '<td>'+data.location.gun+'</td>'+
                '<td>'+data.location.gu+'</td>'+
                '<td>'+data.location.apt+'</td>'+
                '<td>'+data.aptInfo.moveInDate.replace('.', '-')+'</td>'+
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

        var lang_kor = {
            "decimal" : "",
            "emptyTable" : "데이터가 없습니다.",
            "info" : "_START_ - _END_ (총 _TOTAL_ 건)",
            "infoEmpty" : "0건",
            "infoFiltered" : "(전체 _MAX_ 건 중 검색결과)",
            "infoPostFix" : "",
            "thousands" : ",",
            "lengthMenu" : "_MENU_ 개씩 보기",
            "loadingRecords" : "로딩중...",
            "processing" : "처리중...",
            "search" : "검색 : ",
            "zeroRecords" : "검색된 데이터가 없습니다.",
            "paginate" : {
                "first" : "첫 페이지",
                "last" : "마지막 페이지",
                "next" : "다음",
                "previous" : "이전"
            },
            "aria" : {
                "sortAscending" : " :  오름차순 정렬",
                "sortDescending" : " :  내림차순 정렬"
            }
        };

        $('#aptInfo').DataTable( {
            dom: 'Brtip',
            buttons: [
                'copy'
            ],
            language:lang_kor
        } );
    };

    return {
        init:init,
        setData:setData,
    }
})();