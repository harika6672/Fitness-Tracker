import { Injectable } from '@angular/core';
import { Subject } from 'rxjs' 
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService{
    constructor(private router:Router, public afAuth: AngularFireAuth){}
    authChange = new Subject<boolean>();
    isAuthenticated = false;
   // private user:User;

    registerUser(authData:AuthData){
        /*this.user={
            email:authData.email,
            userId:Math.round(Math.random()*10000).toString()
        };*/
       // console.log(authData.email,authData.password);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
              //console.log(result)
              alert('Registered Successfully');
              this.isAuthenticated=true;
              this.authChange.next(true);
              this.router.navigate(['/login']);
            })
        .catch(error => {
            console.log(error)//this.afAuth.auth.createUserWithEmailAndPassword returns promise
        })
        
        
    }
    
    login(authData:AuthData){
           /* this.user={
                email:authData.email,
                userId:Math.round(Math.random()*10000).toString()
            };*/
            //console.log(authData.email,authData.password);
            this.afAuth.auth.signInWithEmailAndPassword(
                authData.email,
                authData.password)
            .then(result => {
                  //console.log(result);
                  this.isAuthenticated=true;
                  this.authChange.next(true);
                  this.router.navigate(['/training']);
                })
            .catch(error => {
                alert('Invalid Credentials');
                console.log(error);
            });
            
           
          
    }
    logout(){
        //this.user=null;
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    /*getUser(){
        return {...this.user};
    }*/

    isAuth(){
        return this.isAuthenticated;
    }


    
}