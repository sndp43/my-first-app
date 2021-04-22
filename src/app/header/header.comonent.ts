import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/dataStorage.service';
@Component({
  selector:"app-header",
  templateUrl:"./header.component.html"
})

export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSubs:Subscription;
  collapsed = true;
  constructor(private datSstoreServ:DataStorageService,private authServ:AuthService){}

  ngOnInit(){
    this.userSubs = this.authServ.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    })
  }

  storeRecipes(){
    this.datSstoreServ.storeRecipes();
  }

  fetchRecipes(){
    this.datSstoreServ.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authServ.logout();
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }
}
