import { Component } from '@angular/core';
import {AuthService} from "../../service/AuthService";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  firstName = '';
  lastName = '';
  dateOfBirth: Date | null = null;
  username = '';
  password = '';
  message = '';
  isError = false;
  error = '';
  registertgRowIndex: boolean = false;
  usernameL=  '';
  passwordL= '';
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.usernameL, this.passwordL).pipe(
      tap(() => {
        this.authService.isAuthenticated.next(true);
        this.router.navigate(['/home-page']);
      }),
      catchError((err) => {
        this.error = 'Invalid Credentials';
        return throwError(() => err); // Propaga ulteriormente l'errore se necessario
      })
    ).subscribe();
  }
  startRegister() {
    this.registertgRowIndex = true;
  }

  register() {
    const user = {
      name: this.firstName,
      surname: this.lastName,
      dateBirth: this.dateOfBirth,
      username: this.username,
      password: this.password
    };
    console.log(user)
    this.authService.register(user).subscribe(
      ()=>{
        this.message = 'Registration successful!';
        this.isError = false;

      },
      (error) => {
        this.message = 'Registration failed: ' + error.error;
        this.isError = true;
      }
    )

  }
}
