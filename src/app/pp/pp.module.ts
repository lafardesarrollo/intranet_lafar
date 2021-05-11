import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { PpRoutingModule } from './pp-routing.module';
import { PpComponent } from './pp.component';

@NgModule({
    imports: [
        CommonModule,
        PpRoutingModule,
        LayoutModule
    ],
    declarations: [PpComponent]
})

export class PpModule {}
