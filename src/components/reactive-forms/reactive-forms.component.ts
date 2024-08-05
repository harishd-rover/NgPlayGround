import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {
  userForm = new FormGroup({
    fname: new FormControl('', { validators: Validators.required }),
    lname: new FormControl('', { validators: Validators.required }),
    age: new FormControl('', { validators: [Validators.required, Validators.min(5), Validators.max(10)], })
  })



  onSubmit() {
    console.log(this.userForm.controls['fname'])
    console.log(this.userForm.controls['lname'])
    console.log(this.userForm.controls['age'])

    console.log('first name', this.userForm.controls.fname)
    console.log('last name', this.userForm.controls.fname)

  }

}
