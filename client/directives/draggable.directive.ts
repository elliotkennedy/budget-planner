import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
    selector: '[draggableContent]'
})
export class DraggableDirective {
    private _defaultColor = 'red';
    private el: HTMLElement;
    constructor(el: ElementRef) { this.el = el.nativeElement; }
    @Input() set defaultColor(colorName: string){
        this._defaultColor = colorName || this._defaultColor;
    }
    @Input('draggableContent') highlightColor: string;
    // @HostListener('dragdrop') onMouseEnter() {
    //     this.highlight(this.highlightColor || this._defaultColor);
    //
    // }
    //
    onDragEnter(e:any) {
        e.preventDefault();
        this.el.style.backgroundColor = 'red';
    }

    // @HostListener('mouseleave') onMouseLeave() {
    //     this.highlight(null);
    // }
    private highlight(color: string) {
        this.el.style.backgroundColor = color;
    }
}