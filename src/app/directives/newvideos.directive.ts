import { Directive, ElementRef, Component } from '@angular/core';


@Directive({
  selector: '[appNewvideos]'
})

export class NewvideosDirective {

  constructor(Element: ElementRef) {
    Element.nativeElement.innerText="Text is changed by changeText Directive. ";
  }

}
