import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { TrackingService } from './tracking.service';

@NgModule({
    imports: [
        CommonModule,
        TrackingRoutingModule,
        LayoutModule
    ],
    declarations: [TrackingComponent],
    providers: [
        TrackingService
    ]
})

export class TrackingModule {}
