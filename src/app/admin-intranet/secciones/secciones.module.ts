import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionesRoutingModule } from './secciones-routing.module';
import { SeccionesComponent } from './secciones.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';


@NgModule({
    imports: [
        CommonModule,
        SeccionesRoutingModule,
        DialogModule,
        ListViewModule
    ],
    declarations: [
        SeccionesComponent
    ]
})
export class SeccionesModule {}
