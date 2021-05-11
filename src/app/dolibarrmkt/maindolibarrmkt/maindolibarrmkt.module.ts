import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaindolibarrmktRoutingModule } from './maindolibarrmkt-routing.module';
import { MaindolibarrmktComponent } from './maindolibarrmkt.component';

@NgModule({
    imports: [
        CommonModule,
        MaindolibarrmktRoutingModule
    ],
    declarations: [
        MaindolibarrmktComponent
    ]
})
export class MaindolibarrmktModule {}
