import {Directive, ElementRef, Input} from "@angular/core";
import {Expense} from "../services/budget.service";
import {Chart} from "chart.js";

@Directive({
    selector: '[doughnutChart]'
})
export class DoughnutChartDirective {

    element: any;
    myChart: Chart;

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    @Input() set doughnutChart(doughnutChart: Array<Expense>) {
        this.renderDoughnut(doughnutChart);
    }

    renderDoughnut(doughnutChart: Array<Expense>) {
        if (this.myChart) {
            this.myChart.destroy();
        }

        var canvas = this.element;
        var ctx = canvas.getContext('2d');

        var values = [];
        var labels = [];

        doughnutChart.forEach(a => {
            labels.push(a.name);
            values.push(a.getWeeklyValue().toFixed(2));
        });
        if (values.length < 1) {
            values.push(1);
            labels.push("no input");
        }

        var data = {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: this.colours,
                hoverBackgroundColor: this.colours
            }]
        };

        this.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    colours = [
        "#36A2EB",
        "#FF6384",
        "#FFCE56",
        "#660066",
        "#000066",
        "#FF3300",
        "#009933",
        "#CC3300",
        "#669999",
        "#993399"
    ];

}