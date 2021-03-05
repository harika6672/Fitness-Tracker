import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Excersice } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit,OnDestroy {
  displayedColumns = ['date','name','duration','calories', 'state'];
  dataSource = new MatTableDataSource<Excersice>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  sub:Subscription;
  constructor(private trainingService:TrainingService) { }


  ngOnInit() {
    //this.dataSource.data = this.trainingService.getCompletedOrCancelledExcersices();
    this.sub=this.trainingService.finishedexcersicesChanged.subscribe((e:Excersice[])=>{
      this.dataSource.data=e;
    });
    this.trainingService.fetchCompletedOrCancelledExcersices();
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  doFilter(filterValue:string){
    console.log(filterValue);
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    if(this.sub){
    this.sub.unsubscribe();
    }
  }

}
