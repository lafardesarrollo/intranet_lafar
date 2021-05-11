import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaindolibarrlccRoutingModule } from './maindolibarrlcc-routing.module';
import { MaindolibarrlccComponent } from './maindolibarrlcc.component';

@NgModule({
    imports: [
        CommonModule,
        MaindolibarrlccRoutingModule
    ],
    declarations: [
        MaindolibarrlccComponent
    ]
})
export class MaindolibarrlccModule {}
