import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddalmacenesRoutingModule } from './addalmacenes-routing.module';
import { AddalmacenesComponent } from './addalmacenes.component';

@NgModule({
    imports: [
        CommonModule,
        AddalmacenesRoutingModule
    ],
    declarations: [
        AddalmacenesComponent
    ]
})
export class AddalmacenesModule {}
