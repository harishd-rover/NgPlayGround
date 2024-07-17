import { Component, ElementRef, ViewChild } from '@angular/core';
import { ParentComponent } from "../parent/parent.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ParentComponent]
})
export class HomeComponent {
  title = 'NgPlayGround';
  dialogOpen = false;

  @ViewChild('dialog') dialog !:ElementRef;
  handleClick(){
    console.log("AppCompoent grandParent Host clicked")
    this.dialog.nativeElement.show()
    this.dialogOpen = true
  }

  handleClose(){
    this.dialog.nativeElement.close()
    this.dialogOpen = false
  }
}
