import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AuthModule } from 'src/app/auth/auth.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    
   
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
