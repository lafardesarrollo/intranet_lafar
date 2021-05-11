import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule, 
    MzDatepickerModule, MzToastService, MzToastModule, MzValidationModule, MzTooltipModule,
    MzModalModule,
    MzCollectionModule} from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { HeAprobarSolicitudesGgRoutingModule } from './he-aprobar-solicitudes-gg-routing.module';
import { HeAprobarSolicitudesGgComponent } from './he-aprobar-solicitudes-gg.component';

@NgModule({
    imports: [
        CommonModule,
        HeAprobarSolicitudesGgRoutingModule,
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
        Ng2SearchPipeModule,
        MzCollectionModule,
        MzTooltipModule
    ],
    declarations: [HeAprobarSolicitudesGgComponent],
    providers: [HorasExtrasService, MzToastService]
})

export class HeAprobarSolicitudesGgModule {}
