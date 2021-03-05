import { Component, OnInit, EventEmitter,Output, OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth:boolean=false;
  authSubscrition:Subscription;
  
  constructor(private authService:AuthService) {
    console.log("In Constructor")
   }
  
  @Output() sidenavtoggle = new EventEmitter();
  ngOnInit() {
    console.log("In ngOnIniT")
    this.authService.authChange.subscribe(authStatus =>{
         this.isAuth=authStatus;
    });
    console.log(this.isAuth)
  }
  
  sidetoggle(){
      this.sidenavtoggle.emit();
  }

  logoutUser(){
      
      this.authService.logout();
  }

  ngOnDestroy(){
    if(this.authSubscrition){
    this.authSubscrition.unsubscribe();
    }
  }
}
