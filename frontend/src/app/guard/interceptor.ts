import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = localStorage.getItem('username'); // Recupera username salvato
    const password = localStorage.getItem('password'); // Recupera password salvata

    if (username && password) {
      const authHeader = 'Basic ' + btoa(`${username}:${password}`);
      const cloned = req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
