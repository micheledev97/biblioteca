import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = 'admin';
    const password = 'adminpassword';
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    const authReq = req.clone({
      setHeaders: { Authorization: authHeader }
    });

    return next.handle(authReq);
  }
}
