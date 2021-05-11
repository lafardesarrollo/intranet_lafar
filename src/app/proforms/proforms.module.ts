import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { ProformsRoutingModule } from './proforms-routing.module';
import { ProformsComponent } from './proforms.component';

@NgModule({
    imports: [
        CommonModule,
        ProformsRoutingModule,
        LayoutModule
    ],
    declarations: [ProformsComponent],
    providers: []
})

export class ProformsModule {}
