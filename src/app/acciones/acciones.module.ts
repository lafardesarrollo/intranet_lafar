import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { AccionesRoutingModule } from './acciones-routing.module';
import { AccionesComponent } from './acciones.component';

@NgModule({
    imports: [
        CommonModule,
        AccionesRoutingModule,
        LayoutModule
    ],
    declarations: [AccionesComponent]
})

export class AccionesModule {}
