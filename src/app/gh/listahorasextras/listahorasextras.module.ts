import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MzParallaxModule, MzSpinnerModule, MzCardModule, MzSelectModule, MzInputModule,
    MzCheckboxModule, MzButtonModule, MzIconMdiModule, MzIconModule, MzRadioButtonModule,
    MzDatepickerModule, MzToastService, MzToastModule } from 'ngx-materialize';
import { MzSwitchModule } from 'ngx-materialize';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ListahorasextrasRoutingModule } from './listahorasextras-routing.module';
import { ListahorasextrasComponent } from './listahorasextras.component';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        ListahorasextrasRoutingModule,
        FormsModule,
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
        AmazingTimePickerModule,
        MzToastModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
    ],
    declarations: [ListahorasextrasComponent],
    providers: [HorasExtrasService, MzToastService]
})

export class ListahorasextrasModule {}
