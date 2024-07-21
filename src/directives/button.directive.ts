import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
  inject,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: 'button[btnType]',
  standalone: true,
  exportAs: 'btnDir',
  host: {
    'class': 'primary',    // static binding
    '(mouseleave)': 'handleOnLeave()',  // event binding
    '[title]': 'title()',    // property binding
    '(click)': 'handleClick($event)'  // event binding with event data
  },
})
export class ButtonDirective {

  title = input.required({ alias: 'btnTitle' });
  btnType = input.required({ alias: 'btnType' });

  btnClick = output<any>();

  private host = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  private renderer = inject(Renderer2);
  @HostBinding('style.background-color') bgColor = 'aqua';

  constructor() {
    // this.host.nativeElement.style.color = 'grey';
    this.renderer.setStyle(this.host.nativeElement, 'padding', '4px 12px');
    this.renderer.setStyle(this.host.nativeElement, 'border-radius', '6px');
  }

  @HostListener('mouseover')
  handleOnHover() {
    this.host.nativeElement.style.color = 'grey';
    this.host.nativeElement.style.boxShadow = '2px 2px 2px #888888';
    this.host.nativeElement.style.cursor = 'pointer';
    this.host.nativeElement.style.backgroundColor = '#92ffff';

  }

  handleOnLeave() {
    this.host.nativeElement.style.color = 'black';
    this.host.nativeElement.style.boxShadow = 'none';
    this.host.nativeElement.style.cursor = 'none';
    this.host.nativeElement.style.backgroundColor = 'aqua';
  }

  handleClick(event: any) {
    this.btnClick.emit(event)
    console.log(event)
  }
}
