import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule, 
    MzDatepickerModule, MzToastService, MzToastModule, MzValidationModule, MzTooltipModule,
    MzModalModule} from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { HeAprobarSolicitudesRoutingModule } from './he-aprobar-solicitudes-routing.module';
import { HeAprobarSolicitudesComponent } from './he-aprobar-solicitudes.component';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        HeAprobarSolicitudesRoutingModule,
        ReactiveFormsModule,
        MzParallaxModule,
        MzSpinnerModule,
        MzCardModule,
        MzSelectModule,
        MzInputModule,
        MzRadioButtonModule,
        MzCheckboxModule,
        MzDatepickerModule,
        MzButtonModule,
        MzIconMdiModule,
        MzIconModule,
        MzSwitchModule,
        MzValidationModule,
        AmazingTimePickerModule,
        MzToastModule,
        MzTooltipModule,
        AutocompleteLibModule,
        NgSelectModule,
        MzModalModule,
        Ng2SearchPipeModule
    ],
    declarations: [HeAprobarSolicitudesComponent],
    providers: [HorasExtrasService, MzToastService]
})

export class HeAprobarSolicitudesModule {}
