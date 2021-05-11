import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { AgmRoutingModule } from './agm-routing.module';
import { AgmComponent } from './agm.component';

@NgModule({
    imports: [
        CommonModule,
        AgmRoutingModule,
        LayoutModule
    ],
    declarations: [AgmComponent]
})

export class AgmModule {}
