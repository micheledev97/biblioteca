import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080';
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public role = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log('Attempting login with username:', username);

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });
    console.log('Generated Authorization Header:', headers.get('Authorization'));

    return this.http.get(`${this.apiUrl}/api/books`, { headers, observe: 'response' }).pipe(
      tap(response => {
        console.log('HTTP Response received:', response);

        // Aggiorna stato autenticazione
        this.isAuthenticated.next(true);
        if (username === 'admin') {
          console.log('User identified as ADMIN');
          this.role.next('ADMIN');
        } else {
          console.log('User identified as USER');
          this.role.next('USER');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        this.isAuthenticated.next(false);
        throw error; // Propaga l'errore
      })
    );
  }


  logout() {
    this.isAuthenticated.next(false);
    this.role.next('');
  }

  register(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.apiUrl}/api/users/register`, user);
  }
}
