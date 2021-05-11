import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesglvRoutingModule } from './solicitudesglv-routing.module';
import { SolicitudesglvComponent } from './solicitudesglv.component';

@NgModule({
    imports: [
        CommonModule,
        SolicitudesglvRoutingModule
    ],
    declarations: [
        SolicitudesglvComponent
    ]
})
export class SolicitudesglvModule {}
