import {Directive, ElementRef, Input} from "@angular/core";

declare var $:any;

@Directive({
    selector: '[draggable]'
})
export class DraggableDirective {

    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('callback') callback: Function;

    ngAfterViewInit() {
        $(this.el).sortable({
            update: () => {
                var ids = $(this.el).sortable('toArray');
                this.callback(ids)
            }
        });
    }

}
