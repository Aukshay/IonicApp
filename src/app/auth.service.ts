import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from './user.service';


@Injectable()
export class AuthService implements CanActivate {
    path: import("@angular/router").ActivatedRouteSnapshot[];
    route: import("@angular/router").ActivatedRouteSnapshot;
    


    constructor(private router: Router, private user: UserService) {

    }

    async canActivate(route){
        if(await this.user.isAuthenticated()){
            return true
        }
        this.router.navigate(['/login']);
        return false;
    }

    
}
