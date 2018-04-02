/**
 * Created by ruudnike on 2017-04-05.
 */


function getData(){
    var roomTypes = [];
    console.log('getData!!!');
    $('#ground_area ul.plane>li').each(function(index, child){
        /*console.log($($(child).children('h4')).children('span').text());
        console.log($($($(child).children('dl')).children('dd')[0]).text());
        console.log($($($(child).children('dl')).children('dd')[1]).text());
        console.log($($($(child).children('dl')).children('dd')[2]).text());
        console.log($($($(child).children('dl')).children('dd')[3]).text());
        console.log($($($(child).children('dl')).children('dd')[4]).text());
        console.log($($($(child).children('dl')).children('dd')[5]).text());*/
        roomTypes.push({
            type:$($(child).children('h4')).children('span').text(),
            supplySize:$($($(child).children('dl')).children('dd')[0]).text(),
            privateSize:$($($(child).children('dl')).children('dd')[1]).text(),
            entrance:$($($(child).children('dl')).children('dd')[2]).text(),
            roomCount:$($($(child).children('dl')).children('dd')[3]).text().replace('개',''),
            bathCount:$($($(child).children('dl')).children('dd')[4]).text().replace('개',''),
            numOfHouseholds:$($($(child).children('dl')).children('dd')[5]).text().replace('세대',''),
        });
    });
    console.log($('#loc_view1 div.selectbox-label').text());
    console.log($('#loc_view2 div.selectbox-label').text());
    console.log($('#loc_view3 div.selectbox-label').text());
    console.log($('#loc_view4 div.selectbox-label').text());
    var location = {
        si:$('#loc_view1 div.selectbox-label').text(),
        gun:$('#loc_view2 div.selectbox-label').text(),
        gu:$('#loc_view3 div.selectbox-label').text(),
        apt:$('#loc_view4 div.selectbox-label').text(),
    };
    var aptInfo = {
        moveInDate:'',
        totalNumOfHouseholds:'',
        totalNumOfDong:'',
        totalNumOfFloor:'',
        heating:'',
    };
    return {
        location:location,
        aptInfo:aptInfo,
        roomTypes:roomTypes
    }
}

chrome.extension.sendMessage({
    action:"getSource",
    source:getData()
});