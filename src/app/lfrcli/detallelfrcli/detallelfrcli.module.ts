import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallelfrcliRoutingModule } from './detallelfrcli-routing.module';
import { DetallelfrcliComponent } from './detallelfrcli.component';

@NgModule({
    imports: [
        CommonModule,
        DetallelfrcliRoutingModule
    ],
    declarations: [
        DetallelfrcliComponent
    ]
})
export class DetallelfrcliModule {}
