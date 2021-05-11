import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { VismedRoutingModule } from './vismed-routing.module';
import { VismedComponent } from './vismed.component';

@NgModule({
    imports: [
        CommonModule,
        VismedRoutingModule,
        LayoutModule
    ],
    declarations: [VismedComponent]
})

export class VismedModule {}
