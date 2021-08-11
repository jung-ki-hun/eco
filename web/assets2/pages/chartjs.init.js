/*
 Template Name: Admiria - Bootstrap 4 Admin Dashboard
 Author: Themesbrand
 File: Chartjs chart Init
 */

!function($) {
    "use strict";

    var ChartJs = function() {};

    ChartJs.prototype.respChart = function(selector,type,data, options) {
        // get selector by context
        var ctx = selector.get(0).getContext("2d");
        // pointing parent container to make chart js inherit its width
        var container = $(selector).parent();

        // enable resizing matter
        $(window).resize( generateChart );

        // this function produce the responsive Chart JS
        function generateChart(){
            // make chart width fit with its container
            var ww = selector.attr('width', $(container).width() );
            switch(type){
                case 'Line':
                    new Chart(ctx, {type: 'line', data: data, options: options});
                    break;
                case 'Doughnut':
                    new Chart(ctx, {type: 'doughnut', data: data, options: options});
                    break;
                case 'Pie':
                    new Chart(ctx, {type: 'pie', data: data, options: options});
                    break;
                case 'Bar':
                    new Chart(ctx, {type: 'bar', data: data, options: options});
                    break;
                case 'Radar':
                    new Chart(ctx, {type: 'radar', data: data, options: options});
                    break;
                case 'PolarArea':
                    new Chart(ctx, {data: data, type: 'polarArea', options: options});
                    break;
            }
            // Initiate new chart or Redraw

        };
        // run function - render chart at first load
        generateChart();
    },
    //init
    ChartJs.prototype.init = function() {
        //creating lineChart
        var lineChart = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September","October"],
            datasets: [
                {
                    label: "Sales Analytics",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "rgba(0, 150, 136, 0.2)",
                    borderColor: "#009688",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#009688",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#009688",
                    pointHoverBorderColor: "#eef0f2",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
                },
                {
                    label: "Monthly Earnings",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "rgba(29, 30, 58, 0.2)",
                    borderColor: "#707070",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#707070",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#707070",
                    pointHoverBorderColor: "#eef0f2",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36]
                }
            ]
        };

        var lineOpts = {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 20,
                        stepSize: 10
                    }
                }]
            }
        };

        this.respChart($("#lineChart"),'Line',lineChart, lineOpts);

        //barchart
        var barChart = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Sales Analytics",
                    backgroundColor: "#6d60b0",
                    borderColor: "#6d60b0",
                    borderWidth: 0,
                    hoverBackgroundColor: "#6d60b0",
                    hoverBorderColor: "#6d60b0",
                    data: [65, 59, 81, 45, 56, 80, 50,20]
                },
                {
                    label: "Sales Analytics",
                    backgroundColor: "#afb42b",
                    borderColor: "#afb42b",
                    borderWidth: 0,
                    hoverBackgroundColor: "#afb42b",
                    hoverBorderColor: "#afb42b",
                    data: [80, 50, 35, 81, 40, 30, 70,62]
                },
                {
                    label: "Sales Analytics",
                    backgroundColor: "#eb7475",
                    borderColor: "#eb7475",
                    borderWidth: 0,
                    hoverBackgroundColor: "#eb7475",
                    hoverBorderColor: "#eb7475",
                    data: [85, 58, 52, 20, 80, 20, 68,32]
                }
            ]
        };
        this.respChart($("#bar"),'Bar',barChart);


        //Pie chart
        var pieChart = {
            labels: [
                "Activated",
                "Pending",
                "Deactivated"
            ],
            datasets: [
                {
                    data: [300, 180, 210],
                    backgroundColor: [
                        "#f06292",
                        "#4ac18e",
                        "#ebeff2"
                    ],
                    hoverBackgroundColor: [
                        "#f06292",
                        "#4ac18e",
                        "#ebeff2"
                    ],
                    hoverBorderColor: "#fff"
                }]
        };
        this.respChart($("#pie"),'Pie',pieChart);

        //donut chart
        var donutChart = {
            labels: [
                "Desktops",
                "Tablets",
                "Deactivated"
            ],
            datasets: [
                {
                    data: [300, 210, 120],
                    backgroundColor: [
                        "#67a8e4",
                        "#8d6e63",
                        "#ebeff2"
                    ],
                    hoverBackgroundColor: [
                        "#67a8e4",
                        "#8d6e63",
                        "#ebeff2"
                    ],
                    hoverBorderColor: "#fff"
                }]
        };
        this.respChart($("#doughnut"),'Doughnut',donutChart);


        //Polar area  chart
        var polarChart = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    18
                ],
                backgroundColor: [
                    "#67a8e4",
                    "#8d6e63",
                    "#ebeff2",
                    "#f5b7b7"
                ],
                label: 'My dataset', // for legend
                hoverBorderColor: "#fff"
            }],
            labels: [
                "Series 1",
                "Series 2",
                "Series 3",
                "Series 4"
            ]
        };
        this.respChart($("#polarArea"),'PolarArea',polarChart);

        //radar chart
        var radarChart = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "Desktops",
                    backgroundColor: "#009688",
                    borderColor: "#009688",
                    pointBackgroundColor: "#009688",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#009688",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "Tablets",
                    backgroundColor: "#5468da",
                    borderColor: "#5468da",
                    pointBackgroundColor: "#5468da",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#5468da",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        this.respChart($("#radar"),'Radar',radarChart);
    },
    $.ChartJs = new ChartJs, $.ChartJs.Constructor = ChartJs

}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.ChartJs.init()
}(window.jQuery);
