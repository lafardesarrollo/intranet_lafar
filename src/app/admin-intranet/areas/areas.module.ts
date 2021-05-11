import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FormsModule } from '@angular/forms';
import { MzNavbarModule, MzParallaxModule, MzDropdownModule, MzModalModule, MzButtonModule } from 'ngx-materialize';

@NgModule({
    imports: [
        CommonModule,
        AreasRoutingModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        MzNavbarModule,
        MzParallaxModule,
        MzDropdownModule,
        MzModalModule,
        MzButtonModule,
        FormsModule
    ],
    declarations: [
        AreasComponent
    ]
})
export class AreasModule {}
