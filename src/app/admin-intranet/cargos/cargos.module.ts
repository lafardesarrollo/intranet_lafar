import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargosComponent } from './cargos.component';
import { CargosRoutingModule } from './cargos-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CargosRoutingModule
    ],
    declarations: [
        CargosComponent
    ]
})
export class CargosModule {}
