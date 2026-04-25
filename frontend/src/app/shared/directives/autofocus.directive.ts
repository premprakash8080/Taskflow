import { AfterViewInit, Directive, ElementRef } from '@angular/core';

/**
 * Focuses the host element immediately after it's inserted into the DOM.
 * Usage: <input appAutofocus>
 */
@Directive({ selector: '[appAutofocus]' })
export class AutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // setTimeout 0 defers until after Angular has rendered the full view
    setTimeout(() => this.el.nativeElement.focus(), 0);
  }
}
