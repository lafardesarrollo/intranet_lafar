import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitacoraseccionRoutingModule } from './bitacoraseccion-routing.module';
import { BitacoraseccionComponent } from './bitacoraseccion.component';

@NgModule({
    imports: [
        CommonModule,
        BitacoraseccionRoutingModule
    ],
    declarations: [
        BitacoraseccionComponent
    ]
})
export class BitacoraseccionModule {}
