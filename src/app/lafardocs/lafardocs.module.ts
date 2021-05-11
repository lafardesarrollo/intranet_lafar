import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { LafardocsRoutingModule } from './lafardocs-routing.module';
import { LafardocsComponent } from './lafardocs.component';

@NgModule({
    imports: [
        CommonModule,
        LafardocsRoutingModule,
        LayoutModule
    ],
    declarations: [LafardocsComponent]
})
export class LafardocsModule {}
