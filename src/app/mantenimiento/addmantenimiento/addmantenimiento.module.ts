import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddmantenimientoRoutingModule } from './addmantenimiento-routing.module';
import { AddmantenimientoComponent } from './addmantenimiento.component';

@NgModule({
    imports: [
        CommonModule,
        AddmantenimientoRoutingModule
    ],
    declarations: [
        AddmantenimientoComponent
    ]
})
export class AddmantenimientoModule {}
