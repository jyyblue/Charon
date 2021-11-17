import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthServiceService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const currentUser = this.authService.getUserId();

        const isAdmin = this.authService.isAdmin();
        const isLoggedIn = this.authService.isLoggedIn();

        if (isLoggedIn) {
            if (isAdmin) {
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        // this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
