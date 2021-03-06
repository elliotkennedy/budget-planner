import {Directive, ElementRef, Input} from "@angular/core";
import {Chart} from "chart.js";

@Directive({
    selector: '[lineChart]'
})
export class LineChartDirective {

    element: any;
    myChart: Chart;

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    @Input() set lineChart(lineChart: number) {
        this.renderLineChart(lineChart);
    }

    renderLineChart(lineChart: number) {
        if (this.myChart) {
            this.myChart.destroy();
        }

        var canvas = this.element;
        var ctx = canvas.getContext('2d');

        var dataValues = [];
        var labels = [];

        var agg = 0;
        for (let i = 1; i <= 52; i++) {
            dataValues.push(agg);
            labels.push("" + i);
            agg += lineChart;
        }

        var data = {
            labels: labels,
            datasets: [
                {
                    label: "Your Savings",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dataValues
                }
            ],
        };

        var _options = {
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Weeks'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Savings (&#163;)'
                    }
                }]
            }
        };

        this.myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: _options
        });
    }

}