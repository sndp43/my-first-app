import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorServie implements HttpInterceptor{
  constructor(private authServ:AuthService){}

  intercept(req:HttpRequest<any>,next:HttpHandler)
  {

    return this.authServ.user.pipe(
      take(1),
      exhaustMap(user=>{

        //if user is not set then do not add token to the following request
        if(!user){
         return next.handle(req);
        }

        const modifiedReq = req.clone({
          params:new HttpParams().set('auth',user.token)
        })

        return next.handle(modifiedReq);

      }))
  }
}
