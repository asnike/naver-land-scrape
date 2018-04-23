/**
 * Created by ruudnike on 2017-04-05.
 */


function getData(){
    var roomTypes = [];
    console.log('getData!!!');

    var location = {
        si:$('#loc_view1 div.selectbox-label').text(),
        gun:$('#loc_view2 div.selectbox-label').text(),
        gu:$('#loc_view3 div.selectbox-label').text(),
        apt:$('#loc_view4 div.selectbox-label').text(),
    };

    if($('#ground_area ul.plane>li').length > 0){

        $('#ground_area ul.plane>li').each(function(index, child){

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
        /*console.log($('#loc_view1 div.selectbox-label').text());
        console.log($('#loc_view2 div.selectbox-label').text());
        console.log($('#loc_view3 div.selectbox-label').text());
        console.log($('#loc_view4 div.selectbox-label').text());*/


        //console.log($($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[1]).text());
        //console.log($($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[3]).text().trim().replace(/[\n\r\s]/g,'').split('/'));
        //console.log($($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[4]).text());
        //console.log('test', $('#asideComplexInfoLayer'));
        //console.log('trim : ', $($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[3]).text());
        var t0 = $($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[3]).text().trim().replace(/[\n\r\s]/g,'').split('총');
        //console.log('number info', t0);
        var aptInfo = {
            moveInDate:$($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[1]).text().replace('입주일자 : ', ''),
            totalNumOfHouseholds:t0[1].replace('/', '').replace('세대', ''),
            totalNumOfDong:t0[2].replace('/', '').replace('개동', ''),
            totalNumOfFloor:t0[3].replace('/', '').replace('층', ''),
            heating:$($('#asideComplexInfoLayer .traffic_dsc ul.normal>li')[4]).text(),
        };
        return {
            location:location,
            aptInfo:aptInfo,
            roomTypes:roomTypes
        }
    }else if($('#_ptpInfoArea')[0]){
        var exportDataRaw = $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().substring(
            $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().indexOf('var oNoticeInfo = '),
            $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().indexOf('var isaleInfo = ')
        ).trim();
        //console.log(exportDataRaw);
        var a = eval(exportDataRaw);
        console.log(oNoticeInfo);

        var aptInfo = {
            moveInDate:$('table.tbl_detail tr:nth-child(3) td').text(),
            totalNumOfHouseholds:$('table.tbl_detail tr:nth-child(1) td').text(),
            totalNumOfDong:'',
            totalNumOfFloor:'',
            heating:'',
        };

        var roomTypes = [], entranceTypes = {'10': '계단식', '20':'복도식'};
        for(var i = 0, j = oNoticeInfo.ptpList.length ; i < j ; i++){
            roomType = oNoticeInfo.ptpList[i];
            roomTypes.push({
                type:roomType.ptp_nm,
                supplySize:roomType.isale_spc,
                privateSize:roomType.excls_spc,
                entrance:entranceTypes[roomType.ptwy_arch_cd],
                roomCount:roomType.rm_cnt,
                bathCount:roomType.btrm_cnt,
                numOfHouseholds:roomType.isale_hseh_cnt,
            });
        }

        //ptwy_arch_cd : 10 - 계단식, 11 - 복도식

        console.log({
            location:location,
            roomTypes:roomTypes,
            oNoticeInfo:oNoticeInfo
        });
        return {
            location:location,
            roomTypes:roomTypes,
            oNoticeInfo:oNoticeInfo
        }
    }

    /*$('script[language="JavaScript"][type="text/javascript"]').each(function(dd, ff){
        console.log(dd, ff);
    });
    console.log('eval ', eval("window.atest = 'test'"));
    console.log($($('script[language="JavaScript"][type="text/javascript"]')[0]).text());*/

    /*console.log(
        $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().indexOf('var oNoticeInfo = '),
        $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().indexOf('var isaleInfo = ')
    );*/
    /*console.log('export :: ', $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().substring(
        $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().indexOf('var oNoticeInfo = '),
        $($('script[language="JavaScript"][type="text/javascript"]')[0]).text().indexOf('var isaleInfo = ')
    ));*/
    //console.log('eval ', eval("alert('test')"));
    //eval($($('script[language="JavaScript"][type="text/javascript"]')[0]).text());
}

chrome.extension.sendMessage({
    action:"getSource",
    source:getData()
});