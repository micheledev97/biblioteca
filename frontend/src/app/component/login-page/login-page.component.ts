import {Component} from '@angular/core';
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
  usernameL = '';
  passwordL = '';
  private isAuthenticated: any;
  private role: any;

  constructor(private authService: AuthService, private router: Router) {

  }

  login(): void {
    this.authService.loginUser(this.usernameL, this.passwordL).subscribe(
      (response: any) => {
        if (response.message === 'Login successful') {
          console.log("Login successful, setting isAuthenticated to true");
          this.authService.isAuthenticated.next(true);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username', this.usernameL);
          localStorage.setItem('password', this.passwordL);
          // this.role.next(response.role); // Salva il ruolo
          localStorage.setItem('role', response.role);
          this.router.navigate(['/home-page']).then(success => {
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        }
      },
      (error) => {
        console.error(error);
        this.error = 'Username o Password errati'
      }
    )
  }

  startRegister() {
    if (this.registertgRowIndex)
      this.registertgRowIndex = false
    else
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
      () => {
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
