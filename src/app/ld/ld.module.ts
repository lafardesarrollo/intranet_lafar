import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { LdRoutingModule } from './ld-routing.module';
import { LdComponent } from './ld.component';

@NgModule({
    imports: [
        CommonModule,
        LdRoutingModule,
        LayoutModule
    ],
    declarations: [LdComponent]
})

export class LdModule {}
