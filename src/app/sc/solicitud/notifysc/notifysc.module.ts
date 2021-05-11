import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzInputModule, MzButtonModule, MzIconModule, MzIconMdiModule, MzToastService } from 'ngx-materialize';
import { NotifyscRoutingModule } from './notifysc-routing.module';
import { NotifyscComponent } from './notifysc.component';
import { SolicitudService } from '../solicitud.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NotifyscRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzInputModule,
        MzButtonModule,
        MzIconModule,
        MzIconMdiModule,
        FormsModule
    ],
    declarations: [
        NotifyscComponent
    ],
    providers: [
        SolicitudService, MzToastService
    ]
})

export class NotifyscModule {}
