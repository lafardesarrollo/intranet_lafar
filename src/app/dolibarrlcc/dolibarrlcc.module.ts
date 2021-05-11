import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { DolibarrlccRoutingModule } from './dolibarrlcc-routing.module';
import { DolibarrlccComponent } from './dolibarrlcc.component';

@NgModule({
    imports: [
        CommonModule,
        DolibarrlccRoutingModule,
        LayoutModule
    ],
    declarations: [DolibarrlccComponent]
})

export class DolibarrlccModule {}
