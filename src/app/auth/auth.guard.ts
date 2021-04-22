import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn:"root"
})

export class AuthGuard  implements CanActivate{

  constructor(private authServ:AuthService,private router:Router){}

  canActivate(
    route:ActivatedRouteSnapshot,
    router:RouterStateSnapshot
  ):boolean|UrlTree | Promise<boolean | UrlTree>|Observable<boolean | UrlTree>{

      return this.authServ.user.pipe(
        map(user=>{
           const isAuth = !! user;     // user ? true : false
           if(isAuth)
           {
              return true;
           }

           //with the help of UrlTree we can redirect from guard itself as it does expect UrlTree too now not in old versions.
           return this.router.createUrlTree(['./auth']);
        })
      )

  }

}
