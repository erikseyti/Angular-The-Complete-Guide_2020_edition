import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');
    console.log(req.url);
    const modifiedReuqest = req.clone({
      // Example of URL modification on the interceptor
      // url: 'some-new-url',
      headers: req.headers.append('Auth', 'xyz')});
    return next.handle(modifiedReuqest);
  }
}
