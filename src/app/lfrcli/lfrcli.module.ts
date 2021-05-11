import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { LfrcliComponent } from './lfrcli.component';
import { LfrcliRoutingModule } from './lfrcli-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LfrcliRoutingModule,
        LayoutModule
    ],
    declarations: [LfrcliComponent]
})

export class LfrcliModule {}
