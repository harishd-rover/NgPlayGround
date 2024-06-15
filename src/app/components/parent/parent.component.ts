import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { ADMIN_TOKEN, ChildComponent } from '../child/child.component';

const parentObj = { name: "fromParent", isAdmin: true }

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
  providers: [
    { provide: ADMIN_TOKEN, useClass: LoggerService, multi: true },
    { provide: ADMIN_TOKEN, useValue: parentObj, multi: true}
  ]
})
export class ParentComponent {

}
