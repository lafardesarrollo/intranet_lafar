import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzIconMdiModule, MzButtonModule,
    MzInputModule, MzIconModule, MzToastService } from 'ngx-materialize';
import { NotifyocRoutingModule } from './notifyoc-routing.module';
import { NotifyocComponent } from './notifyoc.component';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { Comunes } from '../../../comunes';
import { OrdenService } from '../orden.service';


@NgModule({
    imports: [
        CommonModule,
        NotifyocRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzInputModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        FormsModule
    ],
    declarations: [
        NotifyocComponent
    ],
    providers: [
        SolicitudService, MzToastService, Comunes, OrdenService
    ]
})

export class NotifyocModule {}
