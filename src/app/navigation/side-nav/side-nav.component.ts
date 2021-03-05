import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  isAuth:boolean=false;
  subscriptionEnds:Subscription;
  constructor(private authService:AuthService) { }

  @Output() sidenavclose = new EventEmitter();
  ngOnInit() {
    this.authService.authChange.subscribe(result =>{
      this.isAuth=result;
    });
  }
  
  onClose(){
       this.sidenavclose.emit();
  }
  ngOnDestroy(){
    if(this.subscriptionEnds){
      this.subscriptionEnds.unsubscribe();
    }
  }
  onLogout(){
    this.onClose();
    this.authService.logout();
  }
}
