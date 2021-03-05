import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Excersice } from '../exercise.model';
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() training= new EventEmitter();
  constructor(private trainingService:TrainingService, private db:AngularFirestore) { }
  //trainings ;
  trainings:Excersice[];
  sub:Subscription;
  
  ngOnInit() {
     this.sub =this.trainingService.excersicesChanged.subscribe(e => {
      this.trainings=e;
     });
     this.trainingService.fetchAvailableExcersices();
  }

  newtraining(form){
    //this.training.emit();
     this.trainingService.startExcersice(form.value.excersice);
  }

  ngOnDestroy(){
    if(this.sub){
    this.sub.unsubscribe();
    }
  }

}
