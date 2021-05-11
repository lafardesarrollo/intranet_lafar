import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddaccidentesRoutingModule } from './addaccidentes-routing.module';
import { AddaccidentesComponent } from './addaccidentes.component';

@NgModule({
    imports: [
        CommonModule,
        AddaccidentesRoutingModule
    ],
    declarations: [
        AddaccidentesComponent
    ]
})
export class AddaccidentesModule {}
