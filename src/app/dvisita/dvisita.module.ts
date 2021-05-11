import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { DvisitaRoutingModule } from './dvisita-routing.module';
import { DvisitaComponent } from './dvisita.component';

@NgModule({
    imports: [
        CommonModule,
        DvisitaRoutingModule,
        LayoutModule
    ],
    declarations: [DvisitaComponent]
})

export class DvisitaModule {}
