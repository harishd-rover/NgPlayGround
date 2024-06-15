import { Component, Injector } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { ADMIN_TOKEN, ChildComponent } from '../child/child.component';
import { RootLoggerService } from '../../services/root-logger.service';

const parentObj = { name: "fromParent", isAdmin: true }

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
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

}
