import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CalendarioRoutingModule,
        FormsModule
    ],
    declarations: [
        CalendarioComponent
    ]
})
export class CalendarioModule {}
