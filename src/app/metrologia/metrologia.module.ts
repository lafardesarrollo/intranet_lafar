import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { HigrotermometroService } from './higrotermometro.service';
import { MetrologiaRoutingModule } from './metrologia-routing.module';
import { MetrologiaComponent } from './metrologia.component';

@NgModule({
    imports: [
        CommonModule,
        MetrologiaRoutingModule,
        LayoutModule
    ],
    declarations: [MetrologiaComponent],
    providers: [HigrotermometroService]
})

export class MetrologiaModule {}
