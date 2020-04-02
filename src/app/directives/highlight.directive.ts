import {Directive, ElementRef, Renderer2, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef, private renderer_object: Renderer2)
  {

  }

  @HostListener('mouseenter') onMouseEnter()
  {
      this.renderer_object.addClass(this.el.nativeElement,'highlight');
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.renderer_object.removeClass(this.el.nativeElement,'highlight');
  }

}
