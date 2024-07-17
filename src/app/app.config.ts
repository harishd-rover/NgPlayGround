import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable, finalize, tap, window } from 'rxjs';

const colorLog = (color: string) => {
  return (...args: any) => {
    let str = '%c';
    args.forEach((arg: any) => {
      str += `${arg}`;
    });
    console.log(str, `color:${color};font-size:16px`);
  }
}


export const logInRed = colorLog('tomato');
export const logInGreen = colorLog('chartreuse');
export const logInPink = colorLog('fuchsia');
export const logInYellow = colorLog('yellow');
export const logInBlue = colorLog('aqua');







const baseURL = 'https://jsonplaceholder.typicode.com';

let logInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let ok = '';
  console.log("[ UnModified Request ] : ", req);
  console.log("[ HTTP Request Params ] : ", req.params.toString());
  console.log("[ HTTP Request ContextTokens ] : ", req.context);
  console.log("[ HTTP Request Headers ]  ", req.headers);
  const modifiedReq = req.clone({
    url: baseURL + req.url
  })

  console.log("[ Modified URL Request ] : ", modifiedReq);

  return next(modifiedReq).pipe(
    // while Piping the operators it's very important to use operators that Returns an Observable, that mirrors the source Observable.
    // bcz next handlers requires same. so it's very important to mention return type in function Definition.
    tap({
      next: (response: HttpEvent<unknown>) => {
        if (response.type === HttpEventType.Sent) {
          console.log("[ Ack Response ] : ", response);
        } else if (response.type === HttpEventType.Response) {
          ok = 'Success'
          console.log('[ Response ] : ', response);
        } else if (response.type === HttpEventType.DownloadProgress) {
          console.log('[ DownloadProgress ] : ', response);
        }
        else if (response.type === HttpEventType.UploadProgress) {
          console.log('[ UploadProgress ] : ', response);
        }
        else if (response.type === HttpEventType.ResponseHeader) {
          console.log('[ ResponseHeader ] : ', response);
        }
        else if (response.type === HttpEventType.User) {
          console.log('[ User ] : ', response);
        }
      },
      complete: () => console.log('[ Observable completed!!! ]'),
      error: (error) => {
        ok = 'Failed'
        console.log('[ Error ] : ', error)
      }
    }),

    // if Observable completes or throws error, like finally block,
    // complete notification does not emit when it thows error, so we can use finalize here.
    finalize(() => {
      console.log(`[ Finalize and CleanUp ] : HTTPClient Done it's Job!!!!! with--  ""${ok}"" --status`);
    })
  );
}

// add all interceptors in this array.
const interCeptors = [logInterceptor];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors(interCeptors))
  ]
};
