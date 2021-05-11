import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallevismedRoutingModule } from './detallevismed-routing.module';
import { DetallevismedComponent } from './detallevismed.component';

@NgModule({
    imports: [
        CommonModule,
        DetallevismedRoutingModule
    ],
    declarations: [
        DetallevismedComponent
    ]
})
export class DetallevismedModule {}
