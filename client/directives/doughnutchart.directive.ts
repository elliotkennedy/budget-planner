import {Directive, ElementRef, Input} from '@angular/core';
import {Expense} from '../components/planner/budget.service';

declare var Chart:any;

@Directive({
    selector: '[doughnutChart]'
})

export class DoughnutChartDirective {

    element: any;
    myChart: any;

    @Input() doughnutChart: Array<Expense>;

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    ngAfterViewInit() {
        var canvas = this.element;
        var ctx = canvas.getContext('2d');

        var values = [];
        var labels = [];

        this.doughnutChart.forEach(a => {
            labels.push(a.name);
            values.push(a.value);
        });

        var data = {
            labels: labels,
            datasets: [{
                data: values,
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