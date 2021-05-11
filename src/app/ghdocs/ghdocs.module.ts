import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { GhdocsRoutingModule } from './ghdocs-routing.module';
import { GhdocsComponent } from './ghdocs.component';

@NgModule({
    imports: [
        CommonModule,
        GhdocsRoutingModule,
        LayoutModule
    ],
    declarations: [GhdocsComponent]
})
export class GhdocsModule {}
