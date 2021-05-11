import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { Dvisita1718RoutingModule } from './dvisita1718-routing.module';
import { Dvisita1718Component } from './dvisita1718.component';

@NgModule({
    imports: [
        CommonModule,
        Dvisita1718RoutingModule,
        LayoutModule
    ],
    declarations: [Dvisita1718Component]
})

export class Dvisita1718Module {}
