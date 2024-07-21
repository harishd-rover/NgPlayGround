import { Component, HostListener, Inject, InjectionToken, Injector, Optional, SkipSelf } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

export const ADMIN_TOKEN = new InjectionToken('admin')
const adminObj = { name: "from Child", isAdmin: true }

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
  providers: [
    {
      provide: ADMIN_TOKEN, useFactory: () => {
        return new LoggerService('from Factory from Child Injector Level')
      }, multi: true
    },
    { provide: ADMIN_TOKEN, useValue: adminObj, multi: true }
  ]

})
export class ChildComponent {
  constructor(@Inject(ADMIN_TOKEN) private adminToken: any) {
    console.log(this.adminToken, "from child component")

    // It's very important to rempove this event handler
    window.addEventListener('click', () => {
      console.log('AddEVent Listeer Clcickckckck')
    })
  }
  // constructor(@SkipSelf() @Inject(ADMIN_TOKEN) private adminToken: any, injector: Injector) {
  //   console.log(this.adminToken, "Log from child component")
  // }


  handleButtonClick() {
    console.log('target Button Click')
  }

  handleParentClick() {
    console.log("Btn Parent Div click")
  }


  // No need to remove the listerner, Angular will remove when compoennt is destroyed
  @HostListener('document:click')
  handleDocClick() {
    console.log("clickedddddd!!!!!!")
  }
}
