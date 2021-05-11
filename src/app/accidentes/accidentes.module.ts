import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccidentesRoutingModule } from './accidentes-routing.module';
import { AccidentesComponent } from './accidentes.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
    imports: [
        CommonModule,
        AccidentesRoutingModule,
        LayoutModule
    ],
    declarations: [AccidentesComponent]
})

export class AccidentesModule {}
