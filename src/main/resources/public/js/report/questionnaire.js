/* global firstLevelGeography */

var _ctx = $("meta[name='ctx']").attr("content");

$(document).ready(function () {
    setMenuActive("report-questionnaire");
    $.getJSON(_ctx + "/rest/report/questionnaireInfo", function (report) {
        $('#questionnaireCount1').text(format(report[0][1]));
        $('#questionnaireCount2').text(format(report[0][2]));
    });
    if (reports.includes('r_questionnaire_info_region'))
    {
        var template = $('#template');
        var last = template;
        for (var i in firstLevelGeography) {
            var c = template.clone();
            c.find('#questionnaireCount1').attr('id', 'questionnaireCount1-' + i);
            c.find('#questionnaireCount2').attr('id', 'questionnaireCount2-' + i);
            c.find('.regionName').text(firstLevelGeography[i].name);
            last.after(c);
            last = c;
        }
        for (var i in firstLevelGeography) {
            (function (i, geocode) {
                $.getJSON(_ctx + "/rest/report/questionnaireInfoRegion?region=" + geocode, function (report) {
                    $('#questionnaireCount1-' + i).text(format(report[0][2]));
                    $('#questionnaireCount2-' + i).text(format(report[0][3]));
                });
            })(i, firstLevelGeography[i].code);
        }
    }
});
