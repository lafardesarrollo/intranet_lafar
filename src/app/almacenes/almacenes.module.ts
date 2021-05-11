import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { AlmacenesRoutingModule } from './almacenes-routing.module';
import { AlmacenesComponent } from './almacenes.component';

@NgModule({
    imports: [
        CommonModule,
        AlmacenesRoutingModule,
        LayoutModule
    ],
    declarations: [AlmacenesComponent]
})

export class AlmacenesModule {}
