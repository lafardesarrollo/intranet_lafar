import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { DlbpRoutingModule } from './dlbp-routing.module';
import { DlbpComponent } from './dlbp.component';

@NgModule({
    imports: [
        CommonModule,
        DlbpRoutingModule,
        LayoutModule
    ],
    declarations: [DlbpComponent]
})

export class DlbpModule {}
