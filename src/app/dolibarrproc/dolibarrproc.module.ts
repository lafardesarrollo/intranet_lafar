import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { DolibarrprocComponent } from './dolibarrproc.component';
import { DolibarrprocRoutingModule } from './dolibarrproc-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        DolibarrprocRoutingModule
    ],
    declarations: [DolibarrprocComponent]
})

export class DolibarrprocModule {}
