import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuestrasdvisitaRoutingModule } from './muestrasdvisita-routing.module';
import { MuestrasdvisitaComponent } from './muestrasdvisita.component';

@NgModule({
    imports: [
        CommonModule,
        MuestrasdvisitaRoutingModule
    ],
    declarations: [
        MuestrasdvisitaComponent
    ]
})
export class MuestrasdvisitaModule {}
