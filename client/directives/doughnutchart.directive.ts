import {Directive, ElementRef, Input} from "@angular/core";
import {Expense} from "../services/budget.service";

declare var Chart:any;

@Directive({
    selector: '[doughnutChart]'
})
export class DoughnutChartDirective {

    element: any;
    myChart: any;

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    @Input() set doughnutChart(doughnutChart: Array<Expense>) {
        this.renderDoughnut(doughnutChart);
    }

    @Input() set initialColour(initialColour: string){
        this.colours.unshift(initialColour);
    }

    renderDoughnut(doughnutChart: Array<Expense>) {
        var canvas = this.element;
        var ctx = canvas.getContext('2d');

        var values = [];
        var labels = [];

        doughnutChart.forEach(a => {
            labels.push(a.name);
            values.push(a.getWeeklyValue());
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
            type: "doughnut",
            data: data
        });
    }

    colours = [
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