import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionComponent } from './produccion.component';

@NgModule({
    imports: [
        CommonModule,
        ProduccionRoutingModule,
        LayoutModule
    ],
    declarations: [ProduccionComponent]
})

export class ProduccionModule {}
