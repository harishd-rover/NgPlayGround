import { Component, DestroyRef, ElementRef, ViewChild, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { interval } from 'rxjs';
import { logInBlue, logInGreen, logInPink } from '../../utilities/logger.utility';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  @ViewChild('email') email!: ElementRef;
  private desRef = inject(DestroyRef)
  ngOnInit() {
    const sub = interval(1000).subscribe((val) => {
      logInBlue("interVal-1: ", val)
    })

    // We can attach clean up functions to destroy ref any where, any time.
    // it stores all cleanUp functions and calls them one by once in order they registered.
    this.desRef.onDestroy(() => {
      logInGreen("CleanUp 1");
      sub.unsubscribe();
    })
  }



  ngAfterViewInit() {
    this.email.nativeElement.select();
    const sub2 = interval(2000).subscribe((val) => {
      logInPink("interVal-2: ", val)
    })

    this.desRef.onDestroy(() => {
      logInGreen("CleanUp 2");
      sub2.unsubscribe();
    })
  }
}

