import {
  Component,
  ElementRef,
  Renderer2,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Get all elements with the class animate which will be used to apply the animation classes to
  @ViewChildren('animate') items: QueryList<ElementRef> | undefined;

  constructor(private renderer: Renderer2) {}

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * It adds event listeners to the elements in the QueryList to apply animation classes on mouseenter and remove them on mouseleave.
   */
  ngAfterViewInit() {
    this.items?.forEach((item) => {
      this.renderer.listen(item.nativeElement, 'mouseenter', () => {
        this.renderer.addClass(item.nativeElement, 'animate__animated');
        this.renderer.addClass(item.nativeElement, 'animate__pulse');
      });

      this.renderer.listen(item.nativeElement, 'mouseleave', () => {
        this.renderer.removeClass(item.nativeElement, 'animate__animated');
        this.renderer.removeClass(item.nativeElement, 'animate__pulse');
      });
    });
  }
}
