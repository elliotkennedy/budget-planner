import {Directive, ElementRef, Input, HostListener} from "@angular/core";

declare var $:any;

@Directive({
    selector: '[draggable]'
})
export class DraggableDirective {

    private _callback: Function;
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('callback') callback: Function;

    ngAfterViewInit() {
        $(this.el).sortable({
            stop: this.callback
        });
        // $(this.el).disableSelection();
    }

}
