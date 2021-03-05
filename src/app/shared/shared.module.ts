import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[],
    imports:[   CommonModule,
                MaterialModule, 
                FormsModule,
                FlexLayoutModule],
    exports:[   CommonModule,
                MaterialModule, 
                FormsModule,
                FlexLayoutModule]
})
export class SharedModule{

}