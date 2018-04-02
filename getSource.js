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

    console.log($($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[1]).text());
    console.log($($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[3]).text().trim().replace(/[\n\r\s]/g,'').split('/'));
    console.log($($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[4]).text());
    var t0 = $($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[3]).text().trim().replace(/[\n\r\s]/g,'').split('/');
    var aptInfo = {
        moveInDate:$($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[1]).text().replace('입주일자 : ', ''),
        totalNumOfHouseholds:t0[0].replace('총', '').replace('세대', ''),
        totalNumOfDong:t0[1].replace('총', '').replace('개동', ''),
        totalNumOfFloor:t0[2].replace('총', '').replace('층', ''),
        heating:$($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[4]).text(),
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