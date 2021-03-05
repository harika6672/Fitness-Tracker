import { Excersice } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
@Injectable()
export class TrainingService{
    /*private availableExcersices:Excersice[]=[
        { id: 'Crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'Touch Toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'Side Lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'Burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];*/ //As this data is coming from server
    
    private runningExcersice:Excersice;
    private availableExcersices:Excersice[]=[];
    private excersices:Excersice[] = [];
    excersiceChanged = new Subject<Excersice>();
    excersicesChanged = new Subject<Excersice[]>();
    finishedexcersicesChanged = new Subject<Excersice[]>();
    constructor(private db:AngularFirestore){}
    fetchAvailableExcersices(){
       // return this.availableExcersices.slice();
       this.db.collection('availableExcersices')
                        .snapshotChanges()
                        .pipe(
                         map(docArray =>{
                          return docArray.map(doc => {
                            return {
                              id: doc.payload.doc.id,
                              name: doc.payload.doc.data()['name'],
                              duration: doc.payload.doc.data()['duration'],
                              calories: doc.payload.doc.data()['calories']

                            };
                          });
                        }))
                        .subscribe((e:Excersice[]) =>{
                            this.availableExcersices=e;
                            this.excersicesChanged.next( [...this.availableExcersices])
                        })
    }
    startExcersice(selectedId:string){
        //console.log(this.availableExcersices)
        this.runningExcersice=this.availableExcersices.find(ex => ex.id === selectedId);
        //console.log(this.runningExcersice);
        this.excersiceChanged.next( {...this.runningExcersice});
        
    }
    
    getRunningExcersice(){
        return {...this.runningExcersice};
    }

    completedExcersice(){
        this.addDataToDatabase({...this.runningExcersice,
             date:new Date(), 
             state:'completed'
        });
        this.runningExcersice=null;
        this.excersiceChanged.next(null);
    }

    cancelledExcersice(progress:number){
        this.addDataToDatabase({...this.runningExcersice,
            date:new Date(), 
            duration:this.runningExcersice.duration*(progress/100),
            calories:this.runningExcersice.calories*(progress/100),
            state:'cancelled'
       });
       this.runningExcersice=null;
       this.excersiceChanged.next(null);
    }

    fetchCompletedOrCancelledExcersices(){ 
       // return this.Excersices.slice();
       this.db.collection('finishedExcersices').valueChanges().subscribe((e:Excersice[])=>{
             this.excersices=e;
             this.finishedexcersicesChanged.next(this.excersices);
       })
    }

    addDataToDatabase(excersice:Excersice){
        this.db.collection('finishedExcersices').add(excersice);
        //console.log('Added');
       
    }


   
}
