import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy{
  ongoingTraining=false
  excersiceSubscription:Subscription;
  constructor(private trainingService:TrainingService) {} 
   
  ngOnInit() {
      this.excersiceSubscription=this.trainingService.excersiceChanged.subscribe(
        excersice => {
          if(excersice){
            this.ongoingTraining=true;
          }
          else{
            this.ongoingTraining=false;
          }
        }
      );
  }
  ngOnDestroy(){
    if(this.excersiceSubscription){
      this.excersiceSubscription.unsubscribe();
    }
  }
  

  

}
