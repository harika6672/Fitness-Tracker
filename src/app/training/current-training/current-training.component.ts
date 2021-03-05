import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component'
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  public progress=0;
  timer: any;
  //@Output() trainingexit = new EventEmitter();
  constructor(private dialog:MatDialog, private trainingService:TrainingService) { }

  ngOnInit(){
    this.startOrResumetimer();
  }

  startOrResumetimer(){
    const step = (this.trainingService.getRunningExcersice().duration)/100*1000;
    this.timer=setInterval(()=>{
      this.progress=this.progress+1;
      if(this.progress >= 100){
          this.trainingService.completedExcersice();
          clearInterval(this.timer)
      }
    },step)
  }
  onStop(){
    clearInterval(this.timer);
    const dialogRef=this.dialog.open(StopTrainingComponent,{
      data:{
        progress:this.progress
      }
    });
     dialogRef.afterClosed().subscribe(result => {
      if(result){
       // this.trainingexit.emit();
       this.trainingService.cancelledExcersice(this.progress);
        
      } else{
        this.startOrResumetimer();
      }
    });
  }
  
  } 



