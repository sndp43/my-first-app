import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError,tap} from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponse{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
//user = new Subject<User>();

//BehaviorSubject is like Subject Only but
//1) BehaviorSubject will give us the privious state of  BehaviorSubject every time on first
//as shown below we can passs 'null' as initial value of user

user = new BehaviorSubject<User>(null);
expirationTimer :any ;

constructor(private http : HttpClient,private router:Router){}

signup(email:string,password:string){

  return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseKey,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      catchError(this.handleError),
      tap(resPonse=>{
        //set session
      this.handleAuthentication(resPonse.email,resPonse.localId,resPonse.idToken,+resPonse.expiresIn);

    }))

}

login(email:string,password:string){

  return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseKey,{
    email:email,
    password:password,
    returnSecureToken:true
  }).pipe(
    catchError(this.handleError),
    tap(resPonse=>{
        //set session
    this.handleAuthentication(resPonse.email,resPonse.localId,resPonse.idToken,+resPonse.expiresIn);
  }))

}

logout(){
  localStorage.removeItem("userData");
  this.user.next(null);
  this.router.navigate(['./auth']);

  //check if after logout autologout timer is still running
   if(this.expirationTimer){
    clearTimeout(this.expirationTimer);
   }
  this.expirationTimer = null;
}

private handleError(errorRes:HttpErrorResponse){

  let errorMessage = "Something Went Wrong";
  if(!errorRes.error || !errorRes.error.error){
    return throwError(errorMessage);
  }

  switch (errorRes.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "Email Exists Already";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "The password is invalid";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "Email Does Not Exists";
      break;
    default:
      errorMessage = "Something Went Wrong";
  }
  return throwError(errorMessage);

}

//basically emitting the user info as session
private handleAuthentication(email:string,userId:string,idToken:string,expiresIn:number){
  const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);

  //here new Date().getTime() :- return current time in miliseconds
  //here resPonse.expiresIn*1000 :- converts seconds to miliseconds

   const user = new User(email,userId,idToken,expirationDate);
   this.user.next(user);

   //create temporary session using LocalStorage
  localStorage.setItem("userData",JSON.stringify(user));

  //start autologout timer and pass time in ms
  this.autoLogout(expiresIn*1000);
}

  autoLogin(){
    //auto login will check if loaded user from local storage still has token
    //if yes then emit user session

  const userData:{
    email:string,
    userId:string,
    _token:string,
    _expirationDate:string
  } = JSON.parse(localStorage.getItem("userData"));

  if(!userData){
    return;
  }

  const loadedUser = new User(userData.email,userData.userId,userData._token,userData._expirationDate);

  if(loadedUser.token){
    this.user.next(loadedUser);

    const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);

  }

  //if expirationDate is over then logout
  //calculate time in ms remaining
  // future time in ms - current time in ms
  const timeRemaining = new Date(userData._expirationDate).getTime() - new Date().getTime();
  if(!timeRemaining){
    this.logout();
  }

}

autoLogout(expirationTime:number){
//expirationTime in ms

  this.expirationTimer =  setTimeout(()=>{
    this.logout();
  },expirationTime);

}

}
