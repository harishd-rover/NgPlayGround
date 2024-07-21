import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable, tap, finalize } from "rxjs";


const baseURL = 'https://jsonplaceholder.typicode.com';

// Ihis interceptor function/method is called by prevoius hanlder(in this case httpClient) which sent the request to this interceptor/handler and it is waiting for responce from this interceptor.(httpclient is waaiting there for responce from this interceptor)
export const logInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> | ReturnType<HttpHandlerFn> => {
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
    // Here we are sending the request to the next handler and waiting for responce from next Intercepter/handler( in this case HttpBackEnd is the next handler).
    // here we can pipe and tap into response of next handler/interceptor. and can do the manipulation to the response.
    // this response will get pass into previous hanlder/interceptor(in this case httpClient).

    // while Piping the operators to the observable returned by next handler it's very important to use operators that Returns an Observable, that mirrors the source Observable.
    // bcz next handlers requires same same type/unmodifined type [HttpEvent<any>]. so it's very important to mention return type in function Definition.

    tap({
      next: (response: HttpEvent<unknown>) => {
        if (response.type === HttpEventType.Sent) {
          console.log("[ Ack Response ] : ", response);
        } else if (response.type === HttpEventType.Response) {
          ok = 'Success';
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

