import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public dataService: DataService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log('NA');
  if(route.data?.access && route.data?.access === 'all'){
    this.dataService.setProfileObs(true);
    return true;
  }
    
    const user = this.auth.getUserInfo();
    if (user) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(user.Role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      this.dataService.setProfileObs(true);
      return true;
    }



    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;

  }
}
