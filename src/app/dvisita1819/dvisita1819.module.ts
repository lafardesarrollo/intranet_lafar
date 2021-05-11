import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { Dvisita1819RoutingModule } from './dvisita1819-routing.module';
import { Dvisita1819Component } from './dvisita1819.component';

@NgModule({
    imports: [
        CommonModule,
        Dvisita1819RoutingModule,
        LayoutModule
    ],
    declarations: [Dvisita1819Component]
})

export class Dvisita1819Module {}
