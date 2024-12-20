import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public role = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  loginUser(username:string,password:string){
    const payload ={username,password};
    return this.http.post(`${this.apiUrl}/login`, payload);
  }


  logout() {
    this.isAuthenticated.next(false);
    this.role.next('');
  }

  register(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
