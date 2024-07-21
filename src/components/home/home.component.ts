import { Component, ElementRef, ViewChild } from '@angular/core';
import { ParentComponent } from "../parent/parent.component";
import { FileUploadDownloadComponent } from '../file-upload-download/file-upload-download.component';
import { ButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ParentComponent, FileUploadDownloadComponent,
    ButtonDirective
  ]
})
export class HomeComponent {
  title = 'NgPlayGround';
  dialogOpen = false;
  @ViewChild('btn') btnDir !: ButtonDirective;
  @ViewChild('dialog') dialog !: ElementRef;

  
  handleClick() {
    console.log("AppCompoent grandParent Host clicked")
    this.dialog.nativeElement.show()
    this.dialogOpen = true;
  }

  ngAfterViewInit() {
    console.log(this.btnDir)
  }

  handleClose() {
    this.dialog.nativeElement.close()
    this.dialogOpen = false
  }
}
