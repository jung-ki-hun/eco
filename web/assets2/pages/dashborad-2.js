/*
 Template Name: Admiria - Bootstrap 4 Admin Dashboard
 Author: Themesbrand
 File: Dashboard 2 Init
 */

!function ($) {
    "use strict";

    var Dashboard2 = function () {
    };


    //creates area chart //차트 초기 설정하는 공간 뭐가 뭔지 모르니 일단 놔두자
    Dashboard2.prototype.createAreaChart = function (element, pointSize, lineWidth, data, xkey, ykeys, labels, lineColors) {
        Morris.Area({
            element: element,
            pointSize: 0,
            lineWidth: 0,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            resize: true,
            gridLineColor: '#eee',
            hideHover: 'auto',
            lineColors: lineColors,
            fillOpacity: .6,
            behaveLikeLine: true
        });
    },

        //creates Donut chart
        Dashboard2.prototype.createDonutChart = function (element, data, colors) {
            Morris.Donut({
                element: element,
                data: data,
                resize: true,
                colors: colors,
            });
        },


        //creates Stacked chart
        Dashboard2.prototype.createStackedChart  = function(element, data, xkey, ykeys, labels, lineColors) {
            Morris.Bar({
                element: element,
                data: data,
                xkey: xkey,
                ykeys: ykeys,
                stacked: true,
                labels: labels,
                hideHover: 'auto',
                resize: true, //defaulted to true
                gridLineColor: '#eee',
                barColors: lineColors
            });
        },
        // 데이터 설정하는 구간
        Dashboard2.prototype.init = function () {

            //creating area chart
            var $areaData = [
                {y: '2012', a: 41, b: 0, c:30},
                {y: '2013', a: 45, b: 0, c:33},
                {y: '2014', a: 46, b: 0, c:33},
                {y: '2015', a: 45, b: 23, c:32},
                {y: '2016', a: 48, b: 26, c:31},
                {y: '2017', a: 44, b: 25, c:30},
                {y: '2018', a: 40, b: 23, c:28}
            ];
            var $stimeData = [
                {y: "6", a: 0, b: 0, c:0},
                {y: "9", a: 150, b:45, c:15},
                {y: "12", a: 60, b: 150, c:185},
                {y: "15", a: 180, b: 36, c:21},
                {y: "18", a: 90, b: 60, c:0},
                {y: "21", a: 75, b: 240, c:120},
                {y: "24", a: 30, b: 30, c:30}
            ];
            this.createAreaChart('morris-area-example', 0, 0, $areaData, 'y', ['a', 'b', 'c'], ['미세먼지', '초미세먼지', '이산화질소'], ['#009688', '#fb8c00', '#6d60b0']);

            //creating donut chart
            var $donutData = [
                //{label: "Marketing", value: 12},
                {label: "Offline", value: 40},
                {label: "Online", value: 60}
            ];
            this.createDonutChart('morris-donut-example', $donutData, ['#f0f1f4', '#6d60b0', '#009688']);

            var $stckedData  = [
                { y: '초미세먼지', a: 15, b: 35, c: 75, d:76},
                { y: '미세먼지', a: 30, b: 80, c: 150, d:151},
                // { y: '2007', a: 100, b: 90},
                // { y: '2008', a: 75,  b: 65},
                // { y: '2009', a: 100, b: 90},
                // { y: '2010', a: 75,  b: 65},
                // { y: '2011', a: 50,  b: 40},
                // { y: '2012', a: 75,  b: 65}, 
                // { y: '2013', a: 50,  b: 40},
                // { y: '2014', a: 75,  b: 65},
                // { y: '2015', a: 100, b: 90},
                // { y: '2016', a: 80, b: 65}
            ];
            this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a', 'b', 'c', 'd'], ['좋음', '보통', '나쁨','매우나쁨'], ['#369F36','#FFE641','#EB0000','#C71585']);

            //Peity pie
            $('.peity-pie').each(function() {
                $(this).peity("pie", $(this).data());
            });

            //Peity donut
            $('.peity-donut').each(function() {
                $(this).peity("donut", $(this).data());
            });

        },
        //init
        $.Dashboard2 = new Dashboard2, $.Dashboard2.Constructor = Dashboard2
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.Dashboard2.init();
    }(window.jQuery);