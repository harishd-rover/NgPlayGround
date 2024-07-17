import { Component, DestroyRef, NgZone, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ParentComponent } from './components/parent/parent.component';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, interval, map, timer } from 'rxjs';
import { AsyncPipe, UpperCasePipe } from '@angular/common';

// we can have some kind of Tokens/Variables to store some userDefined values accross the application,
// we can use these Tokens while sending the requests,
// and we can set those context Token values anytime and from any part of application.
export const CURRENT_USER_HTTP_CONTEXT_TOKEN = new HttpContextToken(() => '');
export const IS_USER_ADMIN_HTTP_CONTEXT_TOKEN = new HttpContextToken(
  () => false
);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ParentComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    UpperCasePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private ngZone = inject(NgZone);
  private destroyerRef = inject(DestroyRef);
  data$!: Observable<any>;



  ngOnInit(): void {
    // this.ngZone.runOutsideAngular(() => {
    const timerSub = timer(3000).subscribe(() => {
      console.clear();

      // HTTP Params - we can send any Query params map to HttpClient, it will add these Params map to HTTPRequest Object and it generates URL with those queryparams. makes life easy to generate URLs with encoded Query params..
      // just provide query prams here, httpClient will create URL with these Quueryparams
      const httpParam: HttpParams = new HttpParams()
        .set('name', 'Harish')
        .set('age', 20);

      // setting Http headers
      const httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-type': 'application/json',
      });

      // injecting the ContextTokens into the request
      const httpContext: HttpContext = new HttpContext()
        .set(CURRENT_USER_HTTP_CONTEXT_TOKEN, 'RAMESH')
        .set(IS_USER_ADMIN_HTTP_CONTEXT_TOKEN, true);

      this.data$ = this.httpClient.request<{ name: string; age: number }>(
        'post',
        '/posts',
        {
          // -------Request Related Settings---------
          params: httpParam, // to pass QueryParams that will be attached to url by HttpClient
          context: httpContext, // any context tokens to use in in interceptors
          headers: httpHeaders, // any header to pass any specific or custom headers
          reportProgress: false, //If true Listens to other events - UploadProgress and DownLoad Progress and others if any.
          withCredentials: false, // Whether this request should be sent with outgoing credentials (cookies)
          body: {
            // body for request incase resource creation
            name: 'harish d from API post response',
            age: 22,
          },

          // --------End Subscriber related settings-----
          // observe: 'response',   //to specify what reaches to the end subscriber!!!
          observe: 'body',
          // observe:'events',
          responseType: 'json', // responce body type to end Subscriber, HttpBackend will parse the responce body to given responseType,
        }
      );
      // .pipe(map((data)=>data.name))
      // .subscribe((data) => console.log('[ From Subscriber ] ', data));
    });
    this.destroyerRef.onDestroy(() => {
      timerSub.unsubscribe();
    });
    // })


    
  }
}
