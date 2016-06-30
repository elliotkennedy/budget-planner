import {Directive, ElementRef, Input} from '@angular/core';

declare var Chart:any;

@Directive({
    selector: '[doughnutChart]'
})

export class DoughnutChartDirective {

    element: any;
    myChart: any;

    @Input() doughnutChart: any[];

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    ngAfterViewInit() {
        var canvas = this.element;
        var ctx = canvas.getContext('2d');

        var values = [];
        for (var a in this.doughnutChart) {
            values[a] = a.value;
        }

        var data = {
            labels: [
                "Red",
                "Blue",
                "Yellow"
            ],
            datasets: [{
                data: this.doughnutChart,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6385",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
        };

        this.myChart = new Chart(ctx, {
            type: "doughnut",
            data: data
        });
    }

    static colours = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56"
    ];

}