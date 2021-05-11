import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionalesRoutingModule } from './regionales-routing.module';
import { RegionalesComponent } from './regionales.component';

@NgModule({
    imports: [
        CommonModule,
        RegionalesRoutingModule
    ],
    declarations: [
        RegionalesComponent
    ]
})
export class RegionalesModule {}
