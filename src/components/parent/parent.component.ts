import { Component, ElementRef, HostListener, Injector, TemplateRef, ViewChild, ViewContainerRef, asNativeElements, inject } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { ADMIN_TOKEN, ChildComponent } from '../child/child.component';
import { RootLoggerService } from '../../services/root-logger.service';
import { CommonModule } from '@angular/common';

const parentObj = { name: "fromParent", isAdmin: true }

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, CommonModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
  providers: [
    { provide: ADMIN_TOKEN, useValue: parentObj, multi: true },
    {
      provide: ADMIN_TOKEN, useFactory: (injector: Injector) => {
        // return new LoggerService('from Factory from Parent Injector');
        return injector.get(LoggerService);
      }, multi: true,
      deps: [Injector]
    },
    { provide: LoggerService, useExisting: RootLoggerService },
  ]
})
export class ParentComponent {
  clildVisible = true;
  @ViewChild('container', { read: ViewContainerRef }) ngContainer!: ViewContainerRef;
  @ViewChild('container', { read: TemplateRef }) templateRef!: TemplateRef<any>;
  @ViewChild('container', { read: ElementRef }) elementRef!: ElementRef<any>;
  @ViewChild('input', { read: ViewContainerRef }) input!: ViewContainerRef;
  @ViewChild('para', { read: ViewContainerRef }) para!: ViewContainerRef;
  @ViewChild('ngcontainer') ngcontainer:any;


  private logService = inject(LoggerService);

  constructor() {
    console.log("Prent compoent is creaetd");

    console.log(inject(LoggerService));
  }
  handleClick() {
    console.log("app parent Div click")
  }
  ngAfterViewInit() {
    console.log(this.logService);
    console.dir(this.input)
    console.dir(this.ngContainer)
    console.dir(this.templateRef)
    console.dir(this.elementRef)
    console.dir(this.para)
    if (this.templateRef)
      this.para.createEmbeddedView(this.templateRef)
    // this.para.nativeElement.style.color = 'red'


    console.log(this.ngcontainer);
  }

  destroyChild() {
    this.clildVisible = false;
  }
}
