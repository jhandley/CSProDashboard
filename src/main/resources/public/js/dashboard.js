var smallWindow = 560;

$(window).resize(function () {
    doToggling($(window).width());
});

$(function () {
    toggleMenu(true);
    $('body').css('min-height', 40 * $('ul.nav li').length + 150);
});

//Set menu active
function setMenuActive(id) {
    $("#" + id).addClass("active");
    $("#" + id + " a").addClass('active').parent().parent().addClass('in').parent();
}

function toggleMenu(load) {
    if (load)
        doToggling($(window).width());
    else if ($("aside").hasClass("toggle-off"))
        doToggling(smallWindow + 1);
    else
        doToggling(smallWindow);
}

function format(n) {
    if (Math.round(n) === n) {
        return ("" + n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var a = ("" + n).toString().split(".");
    return format(parseInt(a[0])) + '.' + a[1].substr(0, 1);
}

function formatPercentage(a, b) {
    return Math.round(1000. * a / b) / 10 + "%";
}

//write REST response user
function writeMsgs(data, iddiv_msgs) {
    $.each(data, function (index, msg) {
        var classs = 'alert alert-info';
        if (msg.type === 'INFO')
            classs = 'alert alert-success';
        else if (msg.type === 'ERROR')
            classs = 'alert alert-danger';
        var div = $('<div class="' + classs + '"><strong>' + msg.type
                + '</strong>: ' + msg.text + ' </div>"');
        $("#" + iddiv_msgs).append(div);
    });
}

//write REST response user
function writeMsgsError(msg, iddiv_msgs) {

    var classs = 'alert alert-danger';
    var div = $('<div class="' + classs + '">' + msg + ' </div>"');
    $("#" + iddiv_msgs).append(div);

}

function doToggling(w) {
    if (w <= smallWindow) {
        $("aside").addClass("toggle-off");
        $("section").addClass("toggle-off");
        $("footer").addClass("toggle-off");
        $("#toggle-menu").removeClass("fa-chevron-left");
        $("#toggle-menu").addClass("fa-chevron-right");
        $(".sidebar .nav span").addClass("hide-text");
        $(".sidebar .nav i").addClass("push-icon-right");
        $(".sidebar-subnav>li>a").addClass("less-padding-icon-menu");
    } else {
        $("aside").removeClass("toggle-off");
        $("section").removeClass("toggle-off");
        $("footer").removeClass("toggle-off");
        $("#toggle-menu").removeClass("fa-chevron-right");
        $("#toggle-menu").addClass("fa-chevron-left");
        $(".sidebar .nav span").removeClass("hide-text");
        $(".sidebar .nav i").removeClass("push-icon-right");
        $(".sidebar-subnav>li>a").removeClass("less-padding-icon-menu");
    }
}

var __getJSON = $.getJSON;
$.getJSON = function (a, b) {
    var start = true;
    setTimeout(function () {
        if (start) {
            $('#loading').modal('show');
            start = false;
        }
    }, 500);
    __getJSON(a, function (json) {
        b(json);
        start = false;
        $('#loading').modal('hide');
    });
};
