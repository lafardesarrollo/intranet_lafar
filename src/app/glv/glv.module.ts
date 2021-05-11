import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { GlvRoutingModule } from './glv-routing.module';
import { GlvComponent } from './glv.component';

@NgModule({
    imports: [
        CommonModule,
        GlvRoutingModule,
        LayoutModule
    ],
    declarations: [GlvComponent]
})

export class GlvModule {}
