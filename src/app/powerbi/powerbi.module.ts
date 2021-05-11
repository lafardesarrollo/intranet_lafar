import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { PowerbiRoutingModule } from './powerbi-routing.module';
import { PowerbiComponent } from './powerbi.component';

@NgModule({
    imports: [
        CommonModule,
        PowerbiRoutingModule,
        LayoutModule
    ],
    declarations: [PowerbiComponent]
})

export class PowerbiModule {}
