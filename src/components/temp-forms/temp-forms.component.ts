import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonDirective } from '../../directives/button.directive';
import { CommonModule, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-temp-forms',
  standalone: true,
  imports: [FormsModule, ButtonDirective, CommonModule],
  templateUrl: './temp-forms.component.html',
  styleUrl: './temp-forms.component.css'
})
export class TempFormsComponent {


  onSubmit(ngForm:NgForm) {
    console.log(ngForm.form)  // ngForm.form is an FormGroup instance
    console.log(ngForm.controls['fname'])
    console.log(ngForm.controls['lname'])
    console.log(ngForm.controls['age'])

    console.log('first name', ngForm.form.value['fname'])
    console.log('last name', ngForm.form.value['lname'])

    ngForm.resetForm()
    
  }

}
