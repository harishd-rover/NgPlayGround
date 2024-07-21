import { Directive } from '@angular/core';

@Directive({
  selector: '[test]',
  standalone: true,
  exportAs:'testDir'
})
export class TestDirective {

  constructor() { 
    console.log("Test Directive Instantiated")
  }

  public name = "harish D from Test Directive";

  public LogName(){
    console.log(this.name);
  }

}
