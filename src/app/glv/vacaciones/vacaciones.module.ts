import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacacionesRoutingModule } from './vacaciones-routing.module';
import { VacacionesComponent } from './vacaciones.component';

@NgModule({
    imports: [
        CommonModule,
        VacacionesRoutingModule
    ],
    declarations: [VacacionesComponent]
})

export class VacacionesModule {}
