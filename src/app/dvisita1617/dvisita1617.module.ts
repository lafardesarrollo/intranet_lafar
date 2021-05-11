import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { Dvisita1617RoutingModule } from './dvisita1617-routing.module';
import { Dvisita1617Component } from './dvisita1617.component';

@NgModule({
    imports: [
        CommonModule,
        Dvisita1617RoutingModule,
        LayoutModule
    ],
    declarations: [Dvisita1617Component]
})

export class Dvisita1617Module {}
