import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoComponent } from './mantenimiento.component';

@NgModule({
    imports: [
        CommonModule,
        MantenimientoRoutingModule,
        LayoutModule
    ],
    declarations: [MantenimientoComponent]
})

export class MantenimientoModule {}
