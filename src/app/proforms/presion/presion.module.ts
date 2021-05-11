import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresionRoutingModule } from './presion-routing.module';
import { PresionComponent } from './presion.component';

@NgModule({
    imports: [
        CommonModule,
        PresionRoutingModule
    ],
    declarations: [
        PresionComponent
    ]
})
export class PresionModule {}
