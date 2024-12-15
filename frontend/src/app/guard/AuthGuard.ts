import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../service/AuthService";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) {
  }

canActivate(): boolean {
    if(this.authService.isAuthenticated.value){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
}

}
