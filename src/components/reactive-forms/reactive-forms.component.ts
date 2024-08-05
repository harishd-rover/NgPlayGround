import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css',
})
export class ReactiveFormsComponent {
  userForm = new FormGroup({
    fname: new FormControl('', { validators: Validators.required }),
    lname: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        (control: AbstractControl) => {
          if ((control.value as string).toLowerCase().includes('hari')) {
            return null; // if validation successfull
          } else {
            return { PattenError: true }; // if not valid
          }
        },
      ],
    }),
    age: new FormControl('', {
      validators: [Validators.required, Validators.min(5), Validators.max(10)],
    }),
  });

  onSubmit() {
    console.log(this.userForm);
    console.log(this.userForm.controls['fname']);
    console.log(this.userForm.controls['lname']);
    console.log(this.userForm.controls['age']);

    console.log('first name', this.userForm.value.fname);
    console.log('last name', this.userForm.value.lname);

    this.userForm.reset();
  }
}
