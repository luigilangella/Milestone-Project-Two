queue()
    .defer(d3.csv, "data/EU-referendum-result-data.csv")
    .await(makegraphs);

function makegraphs(error, data) {
    var ndx = crossfilter(data);
    data.forEach(function(d) {
        d.Valid_Votes = parseInt(d.Valid_Votes);
        d.Leave = parseInt(d.Leave);
        d.Remain = parseInt(d.Remain);
        d.Pct_Leave = parseInt(d.Pct_Leave);
        d.Pct_Remain = parseInt(d.Pct_Remain);
    });


    select_region(ndx);
    show_leave_regions(ndx);
    show_remain_regions(ndx);
    show_percentage_leave_remain(ndx);
    row_test(ndx);
    stackedChart(ndx);
    dc.renderAll();

}

function select_region(ndx) {
    var dim = ndx.dimension(dc.pluck("Region"));
    var group = dim.group();

    dc.selectMenu("#select1")
        .dimension(dim)
        .group(group);
}

function show_leave_regions(ndx) {
    var dim = ndx.dimension(dc.pluck("Region"));
    var group = dim.group().reduce(
        function add_item(p, v) {
            p.count++;
            if (v.Leave > v.Remain) {
                p.area_leave++;
            } else { p.area_remain++; }
            return p;
        },
        function remove_item(p, v) {
            p.count--;
            if (v.Leave > v.Remain) {
                p.area_leave--;
            } else { p.area_remain--; }
            return p;
        },
        function initialise() {
            return { count: 0, area_leave: 0, area_remain: 0 };
        }
    );


    var chart = dc.barChart("#leave-regions");
    chart
        .width(600)
        .height(300)
        .margins({ top: 50, bottom: 120, left: 60, right: 30 })
        .dimension(dim)
        .group(group)
        .valueAccessor(function(d) {
            return [d.value.area_leave];
        })
        .transitionDuration(500)
        .elasticY(true)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Leave Areas by Region")
        .yAxis().ticks(5);
}

function show_remain_regions(ndx) {
    var dim = ndx.dimension(dc.pluck("Region"));
    var group = dim.group().reduce(
        function add_item(p, v) {
            p.count++;
            if (v.Leave > v.Remain) {
                p.area_leave++;
            } else { p.area_remain++; }
            return p;
        },
        function remove_item(p, v) {
            p.count--;
            if (v.Leave > v.Remain) {
                p.area_leave--;
            } else { p.area_remain--; }
            return p;
        },
        function initialise() {
            return { count: 0, area_leave: 0, area_remain: 0 };
        }
    );


    var chart = dc.barChart("#remain-regions");
    chart
        .width(600)
        .height(300)
        .margins({ top: 50, bottom: 120, left: 60, right: 30 })
        .dimension(dim)
        .group(group)
        .valueAccessor(function(d) {
            return [d.value.area_remain];
        })
        .transitionDuration(500)
        .elasticY(true)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Remain Area by Region")
        .yAxis().ticks(5);
}

function show_percentage_leave_remain(ndx) {
    var dim = ndx.dimension(dc.pluck("Region"));
    var area_number_by_region = dim.group().reduceSum(function(d) {
        return [d.Area].length;
    });
    console.log(area_number_by_region.all());
    var percentage_turnout_by_region = dim.group().reduceSum(function(d) {
        return [d.Pct_Turnout];
    });
    console.log(percentage_turnout_by_region.all());

    var group = dim.group().reduceCount(percentage_turnout_by_region / area_number_by_region);

    dc.pieChart("#pie-chart")

    .width(600)
        .height(400)
        .slicesCap(10)
        .innerRadius(100)
        .minAngleForLabel(0.1)
        .transitionDuration(1500)
        .externalLabels(40)
        .externalRadiusPadding(50)
        .drawPaths(true)
        .dimension(dim)
        .group(group)
        .legend(dc.legend().x(-5).y(0).gap(15));
}

function row_test(ndx) {
    var dim = ndx.dimension(dc.pluck("Region"));
    var group = dim.group().reduceSum(function(d) {
        return d.Pct_Leave - d.Pct_Remain;
    });

    dc.rowChart("#row-chart")
        .width(550)
        .height(350)
        .x(d3.scale.linear().domain([6, 20]))
        .elasticX(true)
        .dimension(dim)
        .group(group);

}

function stackedChart(ndx) {
    var dim = ndx.dimension(dc.pluck("Region"));
    var group_leave = dim.group().reduceSum(dc.pluck("Leave"));
    var group_remain = dim.group().reduceSum(dc.pluck("Remain"));


    var stackedChart = dc.barChart("#stacked-chart");
    stackedChart
        .width(800)
        .height(400)
        .margins({ top: 50, bottom: 120, left: 60, right: 30 })
        .dimension(dim)
        .group(group_leave, "Leave")
        .stack(group_remain, "Remain")
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Leave / Remain")
        .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
    stackedChart.margins().right = 100;
}


// function add_item(p, v) {
//     p.count++;
//     p.total += (v.Leave / v.Valid_Votes * 100);
//     p.average = p.total / p.count;
//     return p;
// }

// function remove_item(p, v) {
//     p.count--;
//     if (p.count == 0) {
//         p.total = 0;
//         p.average = 0;
//     } else {
//         p.total -= (v.Leave / v.Valid_Votes * 100);
//         p.average = p.total / p.count;
//     }
//     return p;
// }

// function initialise() {
//     return { count: 0, total: 0, average: 0 };
// }

// function add_item_R(p, v) {
//     p.count++;
//     p.total += (v.Remain / v.Valid_Votes * 100);
//     p.average = p.total / p.count;
//     return p;
// }

// function remove_item_R(p, v) {
//     p.count--;
//     if (p.count == 0) {
//         p.total = 0;
//         p.average = 0;
//     } else {
//         p.total -= (v.Remain / v.Valid_Votes * 100);
//         p.average = p.total / p.count;
//     }
//     return p;
// }

// function initialise_R() {
//     return { count: 0, total: 0, average: 0 };
// }
// var group_leave = dim.group().reduce(add_item, remove_item, initialise);
// var group_remain = dim.group().reduce(add_item_R, remove_item_R, initialise_R);