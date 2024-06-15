import { Component, Inject, InjectionToken, Injector, Optional, SkipSelf } from '@angular/core';
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
  }
  // constructor(@SkipSelf() @Inject(ADMIN_TOKEN) private adminToken: any, injector: Injector) {
  //   console.log(this.adminToken, "Log from child component")
  // }
}
