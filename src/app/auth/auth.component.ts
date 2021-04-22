import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';
import { AlertComponent } from "../shared/alert/alert.component";
import {PlaceHolderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  //place a directive named "appPlaceholder" on <ng-template></ng-template> and then
  //get access of PlaceHolderDirective using @ViewChild as follows
  @ViewChild(PlaceHolderDirective,{static: true}) alerHost :PlaceHolderDirective;

  constructor(
    private authServ:AuthService,
    private router:Router,
    private componentFactoryResolver:ComponentFactoryResolver) { }

  authObser:Observable<AuthResponse>;
  isLoginMode = true;
  isLoading = false;
  errorMessage = "";
  closeSub:Subscription;

  ngOnInit(): void {
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm){
    this.isLoading = true;
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){

      this.authObser = this.authServ.login(email,password);


    }else{
      this.authObser =  this.authServ.signup(email,password);
    }

    this.authObser.subscribe(res=>{
      this.isLoading = false;
      this.errorMessage = "";

      this.router.navigate(['/recipes']);

    },errorRes=>{
      this.isLoading = false;
      this.errorMessage = errorRes;
      this.showErrorAlert(errorRes);
    });

    form.reset();
  }

  onCloseHandeller(){
    this.errorMessage = "";
  }

  //this method is used for programatically showing DYNAMIC COMPONENT (shared/alert)
  showErrorAlert(errorRes:string){

    //create componentFactory and pass the component to it
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    //take the place in DOM where component has to be created
    const hostViewContainerRef = this.alerHost.viewContainerRef;

    //clear the area if anything is already there
    hostViewContainerRef.clear();

    //create component
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    //set error message
    componentRef.instance.message = errorRes;

    //close button event
    this.closeSub =  componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();

    })


  }

  ngOnDestroy(){
    //unsubscribe close subscription
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }


}
