import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { DolibarrmktRoutingModule } from './dolibarrmkt-routing.module';
import { DolibarrmktComponent } from './dolibarrmkt.component';

@NgModule({
    imports: [
        CommonModule,
        DolibarrmktRoutingModule,
        LayoutModule
    ],
    declarations: [DolibarrmktComponent]
})

export class DolibarrmktModule {}
