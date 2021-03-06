
$(function () {
    setMenuActive("report-ea-" + reportType);
    populate(ctx + "/rest/report/eaBy" + reportType, 'ealist');
});


function populate(url, tableId) {
    $.getJSON(url, function (json) {
        var data = json.splice(1);
        for (var i in data) {
            data[i] = data[i].splitted;
        }
        var columnsSet = [];
        for (var i in json[0].splitted) {
            columnsSet.push({title: json[0].splitted[i]});
        }
        columnsSet[columnsSet.length - 3] = {title: 'Completed', render: $.fn.dataTable.render.number(',', '.', 0), 'className': 'numeric'};
        columnsSet[columnsSet.length - 2] = {title: 'Expected', render: $.fn.dataTable.render.number(',', '.', 0), 'className': 'numeric'};
        columnsSet[columnsSet.length - 1] = {title: 'Completed/Exp', render: $.fn.dataTable.render.number(',', '.', 1), 'className': 'numeric'};
        __populate(data, columnsSet, tableId);
    });
}

function updateFilterLists(table, filteredColumns) {
    table.columns(filteredColumns).every(function () {
        var column =  table.column( this, {search: 'applied'} );
        var select = $('<select><option value=""></option></select>')
                .appendTo($(column.footer()).empty())
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                });
        column.data().unique().sort().each(function (d, j) {
            select.append('<option value="' + d + '">' + d + '</option>');
        });

        // The rebuild will clear the exisiting select, so it needs to be repopulated
        var currSearch = column.search();
        if ( currSearch ) {
          select.val( currSearch.substring(1, currSearch.length-1) );
        }
    });
}

function __populate(dataSet, columnsSet, tableId) {
    var tFoot = $(document.createElement('tfoot'));
    var footTr = $(document.createElement('tr'));
    $('#' + tableId).append(tFoot.append(footTr));
    var filters = [];
    for (var i in columnsSet) {
        if (columnsSet[i].className !== 'numeric') {
            filters.push(i);
        }
        footTr.append($(document.createElement('th')));
    }
    var table = $('#' + tableId).DataTable({
        data: dataSet,
        columns: columnsSet,
        responsive: true,
        lengthChange: false,
        pageLength: 10,
        order: [[0, "asc"]],
        buttons: ['csv', 'excel', 'pdf'],
        initComplete: function () {
            updateFilterLists(this.api(), filters);
        },
        drawCallback: function () {
            updateFilterLists(this.api(), filters);
        }
    });
    table.buttons().container().appendTo('#' + tableId + '_wrapper .col-sm-6:eq(0)');
}

