import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIntranetRoutingModule } from './admin-intranet-routing.module';
import { AdminIntranetComponent } from './admin-intranet.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { LayoutModule } from '../layout/layout.module';
import { UsersService } from './users/users.service';
import { CargosService } from './cargos/cargos.service';
import { AreasService } from './areas/areas.service';
import { RegionalesService } from './regionales/regionales.service';
import { SeccionesService } from './secciones/secciones.service';

@NgModule({
    imports: [
        CommonModule,
        AdminIntranetRoutingModule,
        NgxSmartModalModule,
        LayoutModule
    ],
    declarations: [AdminIntranetComponent],
    providers: [ NgxSmartModalService, UsersService, CargosService, AreasService, RegionalesService, SeccionesService]
})

export class AdminIntranetModule {}
