import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddaccionesRoutingModule } from './addacciones-routing.module';
import { AddaccionesComponent } from './addacciones.component';

@NgModule({
    imports: [
        CommonModule,
        AddaccionesRoutingModule
    ],
    declarations: [
        AddaccionesComponent
    ]
})
export class AddaccionesModule {}
