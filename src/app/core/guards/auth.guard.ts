import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private location: Location,
        private router: Router,
        private auth: AuthService,
    ) { }
    

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;
        return this.verifyUser(url, route);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (route.children && route.children.length == 0) {
            return this.canActivate(route, state);
        } else {
            return of(true)
        }
    }
    verifyUser(url: string, route: any): Observable<boolean> {    
        let currentUrl = route.url.map(function (u) { return u.path; });
        let currentPath = this.location.path();
        return this.auth.verifyUser().pipe(map((res) => {
            let body = res;
            if(body.code == 200 ){
                return true;
            }
            else {
                this.auth.logout();
                // if( this.config.withoutLoginUrls.indexOf(currentUrl[0]) <0 ){
                //     this.toaster.error("Please login again");
                //     this.router.navigateByUrl('');
                //     return false;
                // }
                // else {
                //     return true;
                // }
            }
        }))
    }   
}